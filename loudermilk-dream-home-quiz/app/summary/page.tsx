'use client'
import { useEffect, useState } from 'react'
import { LeadGate } from '../(components)/LeadGate'

export default function Summary(){
  const [spec, setSpec] = useState<any>(null)
  const [leadId, setLeadId] = useState<string | null>(null)
  const [url, setUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(()=>{
    const s = localStorage.getItem('quiz-spec')
    if (s) setSpec(JSON.parse(s))
  }, [])

  async function onLead(leadId:string){
    setLeadId(leadId)
    const r = await fetch('/api/generate', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ leadId }) })
    if (!r.ok){
      const j = await r.json().catch(()=>({}))
      if (j?.error === 'limit_reached') setError(`Weekly limit reached (${j.limit}).`)
      else setError('Generation failed. Please try again later.')
      return
    }
    const { url } = await r.json(); setUrl(url)
  }

  if (!spec) return <div className="max-w-3xl mx-auto p-8">No selections found.</div>

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="mb-4">Review your selections</h1>
      <div className="card p-5 mb-6"><pre className="text-sm overflow-auto">{JSON.stringify(spec, null, 2)}</pre></div>
      {!leadId && <LeadGate spec={spec} onSuccess={onLead}/>}
      {error && <div className="mt-4 card p-4 text-red-600">{error} <a className="underline" href="/contact">Schedule a call</a></div>}
      {url && (
        <div className="mt-6 card p-4">
          <h3 className="mb-2">Your Render</h3>
          <img src={url} alt="Render" className="rounded-xl border"/>
          <div className="mt-3 flex gap-2">
            <a href={url} download className="btn btn-outline">Download</a>
            <a href={`/result/${leadId}`} className="btn btn-primary">Open Result Page</a>
          </div>
        </div>
      )}
    </div>
  )
}
