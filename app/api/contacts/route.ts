import { connectToDatabase } from '@lib/api/connectToDatabase';
import Contact from '@lib/models/Contact';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,DELETE,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS(): Promise<NextResponse> {
  return new NextResponse(null, { headers: corsHeaders });
}

export async function GET(): Promise<NextResponse> {
  await connectToDatabase();
  try {
    const contacts = await Contact.find();
    return NextResponse.json({ error: null, data: contacts }, { headers: corsHeaders });
  } catch {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500, headers: corsHeaders });
  }
}

export async function DELETE(request: NextRequest): Promise<NextResponse> {
  await connectToDatabase();
  const id = request.nextUrl.searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'Contact id is required' }, { status: 400, headers: corsHeaders });
  }
  try {
    const deleted = await Contact.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ error: 'Contact not found' }, { status: 404, headers: corsHeaders });
    }
    return NextResponse.json({ error: null }, { headers: corsHeaders });
  } catch {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500, headers: corsHeaders });
  }
}
