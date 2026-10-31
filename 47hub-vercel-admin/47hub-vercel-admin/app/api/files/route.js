import { list } from '@vercel/blob';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export async function GET() {
  try {
    const result = await list({ prefix: 'mods/', limit: 1000 });
    const files = result.blobs
      .filter(blob => blob.pathname.toLowerCase().endsWith('.jar'))
      .map(blob => ({
        filename: blob.pathname.split('/').pop(),
        url: blob.url,
        pathname: blob.pathname,
        size: blob.size,
        uploadedAt: blob.uploadedAt
      }));
    files.sort((a,b)=>a.filename.localeCompare(b.filename,'es'));
    return NextResponse.json({files}, {headers:{'Cache-Control':'no-store'}});
  } catch (error) {
    return NextResponse.json({error:'No se pudo consultar el catálogo. Revisa la configuración de Vercel Blob.'},{status:500});
  }
}
