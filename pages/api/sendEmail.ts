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
      const { name, email, message } = req.body;
      if (!name) return res.status(400).json({ error: 'Name is required' });
      if (!email) return res.status(400).json({ error: 'Email is required' });
      if (!message) return res.status(400).json({ error: 'Message is required' });

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
