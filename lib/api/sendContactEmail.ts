import { SendEmailCommand, SESClient } from '@aws-sdk/client-ses';

interface ContactEmailInput {
  name: string;
  email: string;
  message: string;
}

interface SesConfig {
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
  fromAddress: string;
  toAddress: string;
}

const getSesConfig = (): SesConfig | null => {
  const region = process.env.AWS_SES_REGION;
  const accessKeyId = process.env.AWS_SES_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SES_SECRET_ACCESS_KEY;
  const fromAddress = process.env.AWS_SES_FROM_EMAIL;
  const toAddress = process.env.AWS_SES_TO_EMAIL;

  if (!region || !accessKeyId || !secretAccessKey || !fromAddress || !toAddress) return null;
  return { region, accessKeyId, secretAccessKey, fromAddress, toAddress };
};

const config = getSesConfig();

const sesClient = config
  ? new SESClient({
      region: config.region,
      credentials: { accessKeyId: config.accessKeyId, secretAccessKey: config.secretAccessKey },
    })
  : null;

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

export async function sendContactEmail({ name, email, message }: ContactEmailInput): Promise<void> {
  if (!sesClient || !config) {
    // Missing SES configuration should not break contact form submissions.
    return;
  }

  const command = new SendEmailCommand({
    Source: config.fromAddress,
    Destination: { ToAddresses: [config.toAddress] },
    ReplyToAddresses: [email],
    Message: {
      Subject: { Data: `New portfolio contact from ${name}`, Charset: 'UTF-8' },
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: `
            <h2>New contact form submission</h2>
            <p><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(email)}</p>
            <p><strong>Message:</strong></p>
            <p>${escapeHtml(message).replace(/\n/g, '<br />')}</p>
          `,
        },
        Text: {
          Charset: 'UTF-8',
          Data: `New contact form submission\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        },
      },
    },
  });

  await sesClient.send(command);
}
