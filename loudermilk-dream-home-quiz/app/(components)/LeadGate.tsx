'use client'
import { useState } from 'react'
export function LeadGate({ spec, onSuccess }:{ spec:any; onSuccess:(leadId:string)=>void }){
  const [form, setForm] = useState({ firstName:'', lastName:'', email:'', phone:'' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  async function submit(){
    setError(null); setLoading(true);
    try{
      const r = await fetch('/api/lead',{ method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ ...form, spec }) });
      if(!r.ok) throw new Error(await r.text());
      const { leadId } = await r.json(); onSuccess(leadId);
    }catch(e:any){ setError('Please check your details and try again.') } finally { setLoading(false) }
  }
  return (
    <div className="card p-6 max-w-md w-full">
      <h3 className="text-xl font-semibold mb-2">Where should we send your design?</h3>
      <p className="text-sm text-neutral-600 mb-4">We’ll only use this to send your render and follow up about options. No spam.</p>
      <div className="grid grid-cols-2 gap-3">
        <label className="label col-span-1">First name<input className="input" value={form.firstName} onChange={e=>setForm({...form, firstName:e.target.value})}/></label>
        <label className="label col-span-1">Last name<input className="input" value={form.lastName} onChange={e=>setForm({...form, lastName:e.target.value})}/></label>
        <label className="label col-span-2">Email<input className="input" type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})}/></label>
        <label className="label col-span-2">Phone<input className="input" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} placeholder="(404) 555-1234"/></label>
      </div>
      {error && <div className="mt-3 text-sm text-red-600">{error}</div>}
      <button onClick={submit} disabled={loading} className="btn btn-primary w-full mt-4">{loading ? 'Generating…' : 'Generate My Exterior'}</button>
      <p className="text-xs text-neutral-500 mt-2">By continuing you agree to our Privacy Policy.</p>
    </div>
  )
}
