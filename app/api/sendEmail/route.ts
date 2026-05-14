import { connectToDatabase } from '@lib/api/connectToDatabase';
import Contact from '@lib/models/Contact';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS(): Promise<NextResponse> {
  return new NextResponse(null, { headers: corsHeaders });
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  await connectToDatabase();
  try {
    const { name, email, message, recaptchaToken } = await request.json();
    if (!name) return NextResponse.json({ error: 'Name is required' }, { status: 400, headers: corsHeaders });
    if (!email) return NextResponse.json({ error: 'Email is required' }, { status: 400, headers: corsHeaders });
    if (!message) return NextResponse.json({ error: 'Message is required' }, { status: 400, headers: corsHeaders });

    const isProduction = process.env.NEXT_PUBLIC_ENVIRONMENT === 'production';
    const secret = process.env.NEXT_RECAPTCHA_SECRET_KEY;
    if (isProduction && secret) {
      if (!recaptchaToken) {
        return NextResponse.json({ error: 'reCAPTCHA token is required' }, { status: 400, headers: corsHeaders });
      }

      const verifyRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(recaptchaToken)}`,
      });
      const verifyData: { success: boolean; score?: number; action?: string } = await verifyRes.json();

      if (!verifyData.success || (typeof verifyData.score === 'number' && verifyData.score < 0.5)) {
        return NextResponse.json({ error: 'reCAPTCHA verification failed' }, { status: 400, headers: corsHeaders });
      }
    }

    const newContact = new Contact({ name, email, message });
    await newContact.save();
    return NextResponse.json({ error: null }, { status: 201, headers: corsHeaders });
  } catch {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500, headers: corsHeaders });
  }
}
