import type { NextApiRequest, NextApiResponse } from 'next';
import { bodyParser } from './helpers/bodyParser';
import { connectToDatabase } from './helpers/connectToDatabase';
import cors from './helpers/cors';
import Contact from './models/Contact';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  bodyParser();
  await cors(req, res);
  await connectToDatabase();

  if (req.method === 'POST') {
    try {
      const { name, email, message, recaptchaToken } = req.body;
      if (!name) return res.status(400).json({ error: 'Name is required' });
      if (!email) return res.status(400).json({ error: 'Email is required' });
      if (!message) return res.status(400).json({ error: 'Message is required' });

      const isProduction = process.env.NEXT_PUBLIC_ENVIRONMENT === 'production';
      const secret = process.env.NEXT_RECAPTCHA_SECRET_KEY;
      if (isProduction && secret) {
        if (!recaptchaToken) return res.status(400).json({ error: 'reCAPTCHA token is required' });

        const verifyRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(recaptchaToken)}`,
        });
        const verifyData: { success: boolean; score?: number; action?: string } = await verifyRes.json();

        if (!verifyData.success || (typeof verifyData.score === 'number' && verifyData.score < 0.5)) {
          return res.status(400).json({ error: 'reCAPTCHA verification failed' });
        }
      }

      const newContact = new Contact({ name, email, message });
      await newContact.save();
      return res.status(201).json({ error: null });
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
