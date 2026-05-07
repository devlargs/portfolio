import { Box, Button, Input, Text, Textarea, useToast } from '@chakra-ui/react';
import { isValidEmail } from 'largs-utils';
import { FC, ReactElement, useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import defaults from 'theme/defaults';
import FormField from './FormField';
import { getInputStyles } from './inputStyles';

const IS_PRODUCTION = process.env.NEXT_PUBLIC_ENVIRONMENT === 'production';
const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
const RECAPTCHA_ENABLED = IS_PRODUCTION && Boolean(RECAPTCHA_SITE_KEY);
const RECAPTCHA_SCRIPT_ID = 'recaptcha-v3-script';
const RECAPTCHA_STYLE_ID = 'recaptcha-v3-style';
const RECAPTCHA_VISIBLE_CLASS = 'recaptcha-badge-visible';

const injectRecaptchaBadgeStyles = (): void => {
  if (typeof document === 'undefined') return;
  if (document.getElementById(RECAPTCHA_STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = RECAPTCHA_STYLE_ID;
  style.innerHTML = `
    .grecaptcha-badge { visibility: hidden; opacity: 0; transition: opacity 200ms ease; }
    body.${RECAPTCHA_VISIBLE_CLASS} .grecaptcha-badge { visibility: visible; opacity: 1; }
  `;
  document.head.appendChild(style);
};

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

const loadRecaptchaScript = (siteKey: string): void => {
  if (typeof window === 'undefined') return;
  if (document.getElementById(RECAPTCHA_SCRIPT_ID)) return;
  const script = document.createElement('script');
  script.id = RECAPTCHA_SCRIPT_ID;
  script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
};

const getRecaptchaToken = (siteKey: string): Promise<string> =>
  new Promise((resolve, reject) => {
    if (!window.grecaptcha) {
      reject(new Error('reCAPTCHA not loaded'));
      return;
    }
    window.grecaptcha.ready(() => {
      window.grecaptcha?.execute(siteKey, { action: 'contact' }).then(resolve).catch(reject);
    });
  });

const ContactForm: FC = () => {
  const { register, handleSubmit, formState, control, reset } = useForm({ mode: 'all' });
  const { errors } = formState;
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!RECAPTCHA_ENABLED || !RECAPTCHA_SITE_KEY) return;
    loadRecaptchaScript(RECAPTCHA_SITE_KEY);
    injectRecaptchaBadgeStyles();

    const el = formRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        document.body.classList.toggle(RECAPTCHA_VISIBLE_CLASS, entry.isIntersecting);
      },
      { threshold: 0 }
    );
    observer.observe(el);

    return (): void => {
      observer.disconnect();
      document.body.classList.remove(RECAPTCHA_VISIBLE_CLASS);
    };
  }, []);

  const onSubmit = async (value): Promise<void> => {
    setLoading(true);

    try {
      let recaptchaToken = '';
      if (RECAPTCHA_ENABLED && RECAPTCHA_SITE_KEY) {
        try {
          recaptchaToken = await getRecaptchaToken(RECAPTCHA_SITE_KEY);
        } catch {
          toast({
            title: 'reCAPTCHA failed to load. Please refresh and try again.',
            status: 'error',
            position: 'bottom',
          });
          return;
        }
      }

      const res = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...value, recaptchaToken }),
      });

      const { error } = await res.json();

      if (error) {
        toast({ title: 'Something went wrong. Please try again later.', status: 'error', position: 'bottom' });
        reset();
        return;
      }

      toast({ title: 'Message sent successfully.', status: 'success', position: 'bottom' });
      reset();
    } catch (ex) {
    } finally {
      setLoading(false);
    }
  };

  const emailErrorMsg =
    errors.email?.type === 'required'
      ? 'Email is required'
      : errors.email?.type === 'validate'
      ? 'Email is invalid'
      : undefined;

  return (
    <Box as="form" ref={formRef} onSubmit={handleSubmit(onSubmit)} data-contact-form pt="8px">
      <FormField label="Name" error={errors.name ? 'Name is required' : undefined}>
        <Input
          placeholder="Your name"
          {...register('name', { required: true })}
          sx={getInputStyles(Boolean(errors.name))}
        />
      </FormField>

      <FormField label="Email" error={emailErrorMsg}>
        <Controller
          control={control}
          name="email"
          rules={{ required: true, validate: isValidEmail }}
          render={({ field }): ReactElement => (
            <Input placeholder="you@example.com" {...field} sx={getInputStyles(Boolean(errors.email))} />
          )}
        />
      </FormField>

      <FormField label="Message" error={errors.message ? 'Message is required' : undefined}>
        <Textarea
          placeholder="What would you like to say?"
          rows={5}
          {...register('message', { required: true })}
          sx={{ ...getInputStyles(Boolean(errors.message)), resize: 'vertical' }}
        />
      </FormField>

      <Button
        type="submit"
        isDisabled={Boolean(Object.keys(errors).length)}
        isLoading={loading}
        bg={defaults.primary}
        color="white"
        fontSize="14px"
        fontWeight={600}
        px="28px"
        h="42px"
        borderRadius="8px"
        transition="all 220ms ease"
        _hover={{
          bg: defaults.primary,
          transform: 'translateY(-1px)',
          boxShadow: '0 8px 22px rgba(50,171,255,0.35)',
        }}
        _active={{ transform: 'translateY(0)' }}
        _disabled={{
          opacity: 0.5,
          cursor: 'not-allowed',
          _hover: { transform: 'none', boxShadow: 'none' },
        }}
      >
        Send Message
      </Button>

      {RECAPTCHA_ENABLED && (
        <Text fontSize="11px" color="#6b727c" mt="16px" lineHeight="1.6">
          This site is protected by reCAPTCHA and the Google{' '}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: 'underline' }}
          >
            Privacy Policy
          </a>{' '}
          and{' '}
          <a
            href="https://policies.google.com/terms"
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: 'underline' }}
          >
            Terms of Service
          </a>{' '}
          apply.
        </Text>
      )}
    </Box>
  );
};

export default ContactForm;
