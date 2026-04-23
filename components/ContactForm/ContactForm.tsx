import { Button, Input, Text, Textarea, useToast } from '@chakra-ui/react';
import { isValidEmail } from 'largs-utils';
import { FC, ReactElement, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

const IS_PRODUCTION = process.env.NEXT_PUBLIC_ENVIRONMENT === 'production';
const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
const RECAPTCHA_ENABLED = IS_PRODUCTION && Boolean(RECAPTCHA_SITE_KEY);
const RECAPTCHA_SCRIPT_ID = 'recaptcha-v3-script';

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
  const { register, handleSubmit, formState, control, reset } = useForm({
    mode: 'all',
  });
  const { errors } = formState;

  const toast = useToast();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (RECAPTCHA_ENABLED && RECAPTCHA_SITE_KEY) loadRecaptchaScript(RECAPTCHA_SITE_KEY);
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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...value, recaptchaToken }),
      });

      const { error } = await res.json();

      if (error) {
        toast({
          title: 'Something went wrong. Please try again later.',
          status: 'error',
          position: 'bottom',
        });
        reset();
        return;
      }

      toast({
        title: 'Message sent successfully.',
        status: 'success',
        position: 'bottom',
      });
      reset();
    } catch (ex) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} data-contact-form>
      <Text fontSize="14px" color="#878e99">
        Name
      </Text>
      <Input
        placeholder="Name"
        size="sm"
        {...register('name', {
          required: true,
        })}
        border="1px solid gray"
      />
      {errors.name && (
        <Text fontSize="12px" mt="8px" color="red.400">
          Name is required
        </Text>
      )}

      <Text fontSize="14px" color="#878e99" mt="16px">
        Email
      </Text>
      <Controller
        control={control}
        name="email"
        rules={{ required: true, validate: isValidEmail }}
        render={({ field }): ReactElement => <Input placeholder="Email" size="sm" {...field} border="1px solid gray" />}
      />
      {errors.email?.type === 'required' && (
        <Text fontSize="12px" mt="8px" color="red.400">
          Email is required
        </Text>
      )}
      {errors.email?.type === 'validate' && (
        <Text fontSize="12px" mt="8px" color="red.400">
          Email is invalid
        </Text>
      )}

      <Text fontSize="14px" color="#878e99" mt="16px">
        Message
      </Text>
      <Textarea
        placeholder="Your Message"
        size="sm"
        mt="14px"
        {...register('message', {
          required: true,
        })}
        border="1px solid gray"
      />
      {errors.message && (
        <Text fontSize="12px" mt="8px" color="red.400">
          Message is required
        </Text>
      )}

      <Button
        mt="15px"
        borderRadius="none"
        colorScheme="blue"
        type="submit"
        isDisabled={Boolean(Object.keys(errors).length)}
        isLoading={loading}
      >
        Send Message
      </Button>

      {RECAPTCHA_ENABLED && (
        <Text fontSize="11px" color="#878e99" mt="12px">
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
    </form>
  );
};

export default ContactForm;
