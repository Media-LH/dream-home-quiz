import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import { getLead, saveRender } from '@/lib/db';
import { buildPrompt } from '@/lib/prompt';
import brand from '@/content/brand.json';
import { Resend } from 'resend';
import { YourDesignEmail } from '@/emails/YourDesign';

const resend = new Resend(process.env.RESEND_API_KEY!);

function weeklyKey(phoneE164: string) {
  const d = new Date();
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(d.setDate(diff));
  const keyDate = monday.toISOString().slice(0,10);
  return `renders:${phoneE164}:${keyDate}`;
}

export async function POST(req: Request) {
  const { leadId } = await req.json();
  if (!leadId) return NextResponse.json({ error: 'Missing leadId' }, { status: 400 });
  const lead = await getLead(leadId).catch(()=> null);
  if (!lead) return NextResponse.json({ error: 'Unknown lead' }, { status: 404 });

  const key = weeklyKey(lead.phone_e164);
  const used = (await kv.get<number>(key)) || 0;
  const limit = (brand.weeklyRenderLimit ?? 3);
  if (used >= limit) return NextResponse.json({ error: 'limit_reached', limit }, { status: 429 });
  await kv.set(key, used + 1, { ex: 60 * 60 * 24 * 14 });

  const prompt = buildPrompt(lead.spec);
  const r = await fetch('https://api.openai.com/v1/images', {
    method: 'POST',
    headers: { 'Content-Type':'application/json','Authorization':`Bearer ${process.env.OPENAI_API_KEY!}` },
    body: JSON.stringify({ model: 'gpt-image-1', prompt, size: '1792x1024' })
  });
  const data = await r.json();
  const url = data?.data?.[0]?.url;
  if (!url) return NextResponse.json({ error: 'generation_failed', details: data }, { status: 500 });
  await saveRender({ lead_id: lead.id, image_url: url, prompt });

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const previewUrl = `${appUrl}/result/${lead.id}`;
  await resend.emails.send({
    from: 'Loudermilk <designs@your-domain.com>',
    to: lead.email,
    subject: brand.emailSubject,
    react: YourDesignEmail({ imageUrl: url, previewUrl })
  });

  return NextResponse.json({ url });
}
