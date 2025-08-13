import Image from 'next/image'
import brand from '@/content/brand.json'
import Link from 'next/link'
export function ResultHeader(){
  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <div className="flex items-center gap-3">
        <Image src={brand.logoPath} alt="Loudermilk Homes" width={220} height={60}/>
      </div>
      <div className="flex gap-2">
        <Link href={brand.links.contact} className="btn btn-primary">Schedule a Call</Link>
      </div>
    </div>
  )
}
