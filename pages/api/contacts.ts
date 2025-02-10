import type { NextApiRequest, NextApiResponse } from 'next';
import { bodyParser } from './helpers/bodyParser';
import { connectToDatabase } from './helpers/connectToDatabase';
import cors from './helpers/cors';
import Contact from './models/Contact';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  bodyParser();
  await cors(req, res);
  await connectToDatabase();

  if (req.method === 'GET') {
    try {
      const contacts = await Contact.find();
      return res.status(200).json({ error: null, data: contacts });
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
