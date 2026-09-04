const VERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify';
const MIN_SCORE = 0.5;
const EXPECTED_ACTION = 'contact';

/**
 * `skipped` means no verdict was reached, either because no secret is set or
 * because a missing token is tolerated outside production. It is deliberately
 * distinct from `passed` so a misconfiguration can never read as a pass.
 */
export type RecaptchaOutcome = { status: 'skipped' } | { status: 'passed' } | { status: 'rejected'; reason: string };

interface VerifyOptions {
  /** When true, a submission with no token is rejected instead of skipped. */
  required: boolean;
}

interface SiteVerifyResponse {
  success: boolean;
  score?: number;
  action?: string;
  'error-codes'?: string[];
}

export const isRecaptchaConfigured = (): boolean => Boolean(process.env.RECAPTCHA_SECRET_KEY);

export const verifyRecaptcha = async (
  token: string | undefined,
  { required }: VerifyOptions
): Promise<RecaptchaOutcome> => {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) return { status: 'skipped' };

  if (!token) {
    return required ? { status: 'rejected', reason: 'reCAPTCHA token is required' } : { status: 'skipped' };
  }

  let data: SiteVerifyResponse;
  try {
    const response = await fetch(VERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(token)}`,
    });
    data = await response.json();
  } catch {
    return { status: 'rejected', reason: 'reCAPTCHA verification is unavailable' };
  }

  if (!data.success) return { status: 'rejected', reason: 'reCAPTCHA verification failed' };

  /* A token minted for a different action is a token lifted from elsewhere. */
  if (data.action && data.action !== EXPECTED_ACTION) {
    return { status: 'rejected', reason: 'reCAPTCHA verification failed' };
  }

  if (typeof data.score === 'number' && data.score < MIN_SCORE) {
    return { status: 'rejected', reason: 'reCAPTCHA verification failed' };
  }

  return { status: 'passed' };
};
