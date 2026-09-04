'use client';

import cx from '@utils/cx';
import { isValidEmail } from 'largs-utils';
import { FC, ReactElement, useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import styles from './ContactForm.module.css';
import FormField from './FormField';

const IS_PRODUCTION = process.env.NEXT_PUBLIC_ENVIRONMENT === 'production';
const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
const RECAPTCHA_ENABLED = Boolean(RECAPTCHA_SITE_KEY);
const RECAPTCHA_SCRIPT_ID = 'recaptcha-v3-script';
const RECAPTCHA_STYLE_ID = 'recaptcha-v3-style';
const RECAPTCHA_VISIBLE_CLASS = 'recaptcha-badge-visible';

type Status = 'idle' | 'success' | 'error';

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
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

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

  const fail = (message: string): void => {
    setStatus('error');
    setStatusMessage(message);
  };

  const onSubmit = async (value): Promise<void> => {
    setLoading(true);
    setStatus('idle');
    setStatusMessage('');

    try {
      let recaptchaToken = '';
      if (RECAPTCHA_ENABLED && RECAPTCHA_SITE_KEY) {
        try {
          recaptchaToken = await getRecaptchaToken(RECAPTCHA_SITE_KEY);
        } catch {
          if (IS_PRODUCTION) {
            fail('reCAPTCHA did not load. Refresh the page and try again.');
            return;
          }
        }
      }

      const res = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...value, recaptchaToken }),
      });

      const { error } = await res.json();

      if (error) {
        fail('That did not send. Try again in a moment.');
        return;
      }

      setStatus('success');
      setStatusMessage('Message sent. I will get back to you.');
      reset();
    } catch {
      fail('That did not send. Try again in a moment.');
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
    <form ref={formRef} onSubmit={handleSubmit(onSubmit)} data-contact-form noValidate>
      <FormField label="Name" htmlFor="contact-name" error={errors.name ? 'Name is required' : undefined}>
        <input
          id="contact-name"
          className={styles.input}
          placeholder="Your name"
          autoComplete="name"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'contact-name-error' : undefined}
          {...register('name', { required: true })}
        />
      </FormField>

      <FormField label="Email" htmlFor="contact-email" error={emailErrorMsg}>
        <Controller
          control={control}
          name="email"
          rules={{ required: true, validate: isValidEmail }}
          render={({ field }): ReactElement => (
            <input
              id="contact-email"
              className={styles.input}
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="you@example.com"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'contact-email-error' : undefined}
              {...field}
            />
          )}
        />
      </FormField>

      <FormField label="Message" htmlFor="contact-message" error={errors.message ? 'Message is required' : undefined}>
        <textarea
          id="contact-message"
          className={cx(styles.input, styles.textarea)}
          placeholder="What would you like to say?"
          rows={5}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
          {...register('message', { required: true })}
        />
      </FormField>

      <button type="submit" className={styles.submit} disabled={loading || Boolean(Object.keys(errors).length)}>
        {loading && <span className={styles.spinner} aria-hidden="true" />}
        {loading ? 'Sending' : 'Send message'}
      </button>

      <div className={styles.status} aria-live="polite" role="status">
        {status !== 'idle' && (
          <p className={cx(styles.statusLine, status === 'success' && styles.statusSuccess)}>
            <span aria-hidden="true">{status === 'success' ? '✓' : '⚠'}</span>
            {statusMessage}
          </p>
        )}
      </div>

      {RECAPTCHA_ENABLED && (
        <p className={styles.legal}>
          This site is protected by reCAPTCHA and the Google{' '}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">
            Privacy Policy
          </a>{' '}
          and{' '}
          <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer">
            Terms of Service
          </a>{' '}
          apply.
        </p>
      )}
    </form>
  );
};

export default ContactForm;
