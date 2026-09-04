import { Learning } from '../types';

const learning: Learning = {
  slug: 'resend-smtp-on-supabase',
  title: 'How to set up Resend as SMTP on Supabase',
  summary:
    "Supabase's built-in mailer only delivers to your own team and caps at two messages an hour. Swapping in Resend takes ten minutes, and the step everyone forgets is the rate limit.",
  published: '2026-09-04',
  tags: ['supabase', 'resend', 'email', 'auth'],
  body: [
    {
      kind: 'text',
      content:
        'The SMTP server Supabase gives every project is a demo, not a dependency. It refuses to deliver to any address outside your organisation, it is capped at two messages an hour, and it carries no delivery guarantee. The first real signup breaks it.',
    },
    {
      kind: 'text',
      content:
        'I reach for Resend because it speaks plain SMTP, so Supabase needs no code change at all. Six fields in a settings page and you are done.',
    },
    {
      kind: 'heading',
      content: '1. Verify a sending domain in Resend',
    },
    {
      kind: 'text',
      content:
        'Resend will not send from a domain it cannot prove you own. Go to **Domains**, add yours, and copy the DKIM and SPF records it hands you into your DNS. Verification usually clears in a few minutes. The domain has to read *Verified* before anything below will work.',
    },
    {
      kind: 'note',
      tone: 'warn',
      content:
        'The shared `onboarding@resend.dev` sender only delivers to the address on your own Resend account. Fine for a first smoke test. Useless for real signups.',
    },
    {
      kind: 'heading',
      content: '2. Create an API key',
    },
    {
      kind: 'text',
      content:
        'Under **API Keys**, create one with sending permission, scoped to the domain you just verified. The value is shown once. That `re_...` string is the SMTP password, not your account password.',
    },
    {
      kind: 'heading',
      content: '3. Fill in Supabase custom SMTP',
    },
    {
      kind: 'text',
      content:
        'Open **Project Settings → Authentication → SMTP Settings** and turn on *Enable Custom SMTP*. Every value is fixed except the last two.',
    },
    {
      kind: 'fields',
      items: [
        { label: 'Host', value: 'smtp.resend.com' },
        { label: 'Port', value: '465' },
        { label: 'Username', value: 'resend' },
        { label: 'Password', value: 're_your_api_key' },
        { label: 'Sender email', value: 'no-reply@yourdomain.com' },
        { label: 'Sender name', value: 'Your product' },
      ],
    },
    {
      kind: 'text',
      content:
        'The username really is the literal word `resend`, for every account on the platform. It looks wrong. It is not. Port 465 is implicit TLS and it is the one I reach for first, with 587 for STARTTLS if something on the path blocks it, and 2465 and 2587 as the alternates.',
    },
    {
      kind: 'text',
      content:
        'The sender address has to sit on the domain you verified in step one. Get that wrong and Resend rejects the message rather than the connection, which makes it look like Supabase is at fault. That is the failure mode worth memorising.',
    },
    {
      kind: 'heading',
      content: '4. Raise the email rate limit',
    },
    {
      kind: 'text',
      content:
        'This is the step everyone skips, and it is the one that will page you. Turning on custom SMTP does not hand you unlimited sending. It moves you from two messages an hour to thirty, which is a number you can still hit on a good morning.',
    },
    {
      kind: 'text',
      content:
        'Go to **Authentication → Rate Limits** and raise *Rate limit for sending emails* to something your signup volume can live with, staying under what your Resend plan allows. The free tier is 100 emails a day and 3,000 a month.',
    },
    {
      kind: 'heading',
      content: 'The same thing without the dashboard',
    },
    {
      kind: 'text',
      content:
        'If the project is provisioned from CI, the Management API sets the identical fields. Generate a personal access token first.',
    },
    {
      kind: 'code',
      label: 'configure-smtp.sh',
      content: `curl -X PATCH "https://api.supabase.com/v1/projects/$PROJECT_REF/config/auth" \\
  -H "Authorization: Bearer $SUPABASE_ACCESS_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "external_email_enabled": true,
    "smtp_host": "smtp.resend.com",
    "smtp_port": 465,
    "smtp_user": "resend",
    "smtp_pass": "re_your_api_key",
    "smtp_admin_email": "no-reply@yourdomain.com",
    "smtp_sender_name": "Your product"
  }'`,
    },
    {
      kind: 'text',
      content:
        'Self-hosting instead? The same six values go into your `.env` as `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_ADMIN_EMAIL` and `SMTP_SENDER_NAME`. Every service needs a restart to pick them up.',
    },
    {
      kind: 'heading',
      content: 'Checking it actually works',
    },
    {
      kind: 'list',
      ordered: true,
      items: [
        'Trigger a magic link or a password reset against an address that is not on your Supabase team. That address is exactly what the built-in mailer used to refuse, so a delivery here proves the swap took.',
        'Watch **Emails** in the Resend dashboard. A send that appears there and then bounces is a DNS problem. A send that never appears at all is a Supabase problem. That one split saves you an hour of guessing.',
        'Read the Supabase auth logs if nothing shows up on either side.',
      ],
    },
    {
      kind: 'text',
      content:
        'When it fails, it is nearly always one of three things: the sender domain is not verified yet, the API key was pasted with a trailing space, or the port is blocked. None of them produce a helpful error message. Check them in that order.',
    },
    {
      kind: 'note',
      content:
        'Resend is only the transport. The wording of your confirmation and recovery emails still comes from **Authentication → Email Templates** in Supabase, and the defaults there read like a database wrote them. Worth ten minutes of their own.',
    },
  ],
};

export default learning;
