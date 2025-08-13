import '../styles/globals.css'
import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Loudermilk — Dream Home Exterior Quiz',
  description: 'Design your custom exterior and get a photorealistic render.'
}
export default function RootLayout({ children }:{children:React.ReactNode}){
  return <html lang="en"><body>{children}</body></html>
}
