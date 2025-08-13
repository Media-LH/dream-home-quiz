'use client'
import { useState } from 'react'
import quiz from '@/content/quiz.json'
import brand from '@/content/brand.json'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function Page(){
  const [sel, setSel] = useState<any>({ ...quiz.defaults })
  const router = useRouter()

  function setField(sectionId:string, value:any){ setSel((s:any)=> ({...s, [sectionId]: value})) }
  function toggleMaterial(id:string){
    setSel((s:any)=>{
      const cur = new Set(s.materials || []); cur.has(id) ? cur.delete(id) : cur.add(id);
      return { ...s, materials: Array.from(cur) }
    })
  }
  function goSummary(){ localStorage.setItem('quiz-spec', JSON.stringify(sel)); router.push('/summary') }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2"><Image src={brand.logoPath} alt="Loudermilk Homes" width={200} height={50}/></div>
        <button onClick={goSummary} className="btn btn-primary">Review & Generate</button>
      </header>

      <h1 className="mb-2">Design Your Custom Exterior</h1>
      <p className="text-neutral-600 mb-8">Answer a few quick questions and we’ll generate a photorealistic exterior concept.</p>

      <div className="grid gap-6">
        {quiz.sections.map((sec:any)=>(
          <section key={sec.id} className="card p-5">
            <h3 className="mb-2">{sec.title}</h3>
            {sec.type==='tiles' && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {sec.options.map((o:any)=>{
                  const active = sel[sec.id]===o.id
                  return (
                    <button key={o.id} onClick={()=>setField(sec.id, o.id)} className={`border rounded-xl overflow-hidden text-left ${active?'ring-2 ring-neutral-900':''}`}>
                      <Image src={o.image} alt={o.label} width={800} height={600}/>
                      <div className="px-3 py-2 text-sm">{o.label}</div>
                    </button>
                  )
                })}
              </div>
            )}
            {sec.type==='multiselect' && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {sec.options.map((o:any)=>{
                  const active = (sel.materials||[]).includes(o.id)
                  return (
                    <button key={o.id} onClick={()=>toggleMaterial(o.id)} className={`border rounded-xl overflow-hidden text-left ${active?'ring-2 ring-neutral-900':''}`}>
                      <Image src={o.image} alt={o.label} width={800} height={600}/>
                      <div className="px-3 py-2 text-sm">{o.label}</div>
                    </button>
                  )
                })}
              </div>
            )}
            {sec.type==='select' && (
              <select value={sel[sec.id]||''} onChange={(e)=>setField(sec.id, e.target.value)} className="input max-w-md">
                <option value="" disabled>Choose one</option>
                {sec.options.map((o:any)=>(<option key={o.id} value={o.id}>{o.label}</option>))}
              </select>
            )}
          </section>
        ))}
      </div>

      <div className="flex justify-end mt-6"><button onClick={goSummary} className="btn btn-primary">Review & Generate</button></div>
    </div>
  )
}
