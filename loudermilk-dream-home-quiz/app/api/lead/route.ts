import { NextResponse } from 'next/server';
import { z } from 'zod';
import { saveLead } from '@/lib/db';
import { normalizePhoneToE164 } from '@/lib/utils';

const LeadSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(7),
  spec: z.record(z.any())
});

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = LeadSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
  const e164 = normalizePhoneToE164(parsed.data.phone);
  if (!e164) return NextResponse.json({ error: 'Invalid phone' }, { status: 400 });
  const leadId = await saveLead({
    first_name: parsed.data.firstName,
    last_name: parsed.data.lastName,
    email: parsed.data.email,
    phone_e164: e164,
    spec: parsed.data.spec
  });
  return NextResponse.json({ leadId });
}
