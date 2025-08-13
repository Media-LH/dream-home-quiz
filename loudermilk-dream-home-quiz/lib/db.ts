import { createClient } from '@supabase/supabase-js';
const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, { auth: { persistSession: false } });

export type Lead = {
  id: string; first_name: string; last_name: string; email: string; phone_e164: string; spec: any; created_at: string;
};

export async function saveLead(lead: Omit<Lead, 'id'|'created_at'>) {
  const { data, error } = await supabase.from('leads').insert(lead).select('id').single();
  if (error) throw error; return data!.id as string;
}
export async function getLead(id: string) {
  const { data, error } = await supabase.from('leads').select('*').eq('id', id).single();
  if (error) throw error; return data as Lead;
}
export async function saveRender(obj: { lead_id: string; image_url: string; prompt: string; }) {
  const { data, error } = await supabase.from('renders').insert({ lead_id: obj.lead_id, image_url: obj.image_url, prompt: obj.prompt }).select('id').single();
  if (error) throw error; return data!.id as string;
}
export async function getLatestRenderForLead(leadId: string) {
  const { data } = await supabase.from('renders').select('*').eq('lead_id', leadId).order('created_at', { ascending:false }).limit(1).maybeSingle();
  return data;
}
