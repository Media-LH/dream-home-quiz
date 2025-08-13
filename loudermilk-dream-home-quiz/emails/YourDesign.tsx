import * as React from 'react';
import brand from '@/content/brand.json';

export function YourDesignEmail({ imageUrl, previewUrl }:{ imageUrl:string; previewUrl:string; }){
  return (
    <div style={{ fontFamily: 'Arial, Helvetica, sans-serif', background: '#f8f8f8', padding: '24px' }}>
      <table width="100%" cellPadding={0} cellSpacing={0} style={{ maxWidth: 640, margin: '0 auto', background: '#ffffff', borderRadius: 12, overflow: 'hidden' }}>
        <tbody>
          <tr><td style={{ padding: 24, textAlign: 'center', background: '#111' }}>
            <img src={`${process.env.NEXT_PUBLIC_APP_URL || ''}${brand.logoPath}`} alt={brand.brandName} width="220" height="60" style={{ display:'block', margin:'0 auto' }}/>
          </td></tr>
          <tr><td style={{ padding: '20px 24px 0 24px' }}>
            <h1 style={{ margin: 0, fontSize: 22 }}>{brand.emailSubject}</h1>
            <p style={{ color: '#555', lineHeight: 1.5 }}>Thanks for exploring your dream home with {brand.brandName}. Here’s your generated exterior based on your selections.</p>
          </td></tr>
          <tr><td style={{ padding: '0 24px' }}>
            <a href={previewUrl} style={{ textDecoration: 'none' }}>
              <img src={imageUrl} alt="Your Custom Exterior" width="100%" style={{ borderRadius: 8, border: '1px solid #e5e5e5' }}/>
            </a>
          </td></tr>
          <tr><td style={{ padding: 24 }}>
            <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
              <a href={previewUrl} style={{ background: '#111', color: '#fff', padding: '12px 16px', borderRadius: 8, textDecoration: 'none', display: 'inline-block' }}>See Your Design</a>
              <a href={brand.links.website} style={{ border: '1px solid #111', color: '#111', padding: '12px 16px', borderRadius: 8, textDecoration: 'none', display: 'inline-block' }}>Learn More</a>
            </div>
            <p style={{ color: '#555', lineHeight: 1.5, marginTop: 16 }}>{brand.aboutBlurb}</p>
            <p style={{ marginTop: 8 }}><a href={brand.links.gallery} style={{ color: '#111' }}>View our gallery</a> · <a href={brand.links.contact} style={{ color: '#111' }}>Contact us</a></p>
          </td></tr>
          <tr><td style={{ padding: 16, background: '#fafafa', color: '#888', fontSize: 12, textAlign: 'center' }}>
            © {new Date().getFullYear()} {brand.brandName}
          </td></tr>
        </tbody>
      </table>
    </div>
  )
}
