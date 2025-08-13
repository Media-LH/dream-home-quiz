import { ResultHeader } from '@/app/(components)/ResultHeader'
import { getLead, getLatestRenderForLead } from '@/lib/db'

export default async function Result({ params }:{ params:{ id:string } }){
  const lead = await getLead(params.id).catch(()=>null)
  const render = lead ? await getLatestRenderForLead(lead.id) : null
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <ResultHeader />
      <div className="card p-5 mt-2">
        <h1 className="mb-2">Your Custom Exterior</h1>
        {render?.image_url ? <img src={render.image_url} alt="Exterior" className="rounded-xl border"/> : <p>No image found.</p>}
      </div>
    </div>
  )
}
