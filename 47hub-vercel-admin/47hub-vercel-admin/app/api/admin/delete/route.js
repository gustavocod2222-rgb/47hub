import { del } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { isAdmin, sameOrigin } from '../../../../lib/auth';

export const runtime = 'nodejs';
export async function POST(request) {
  if (!sameOrigin(request) || !isAdmin(request)) return NextResponse.json({error:'No autorizado.'},{status:401});
  const body = await request.json().catch(()=>({}));
  if (typeof body.url !== 'string') return NextResponse.json({error:'URL inválida.'},{status:400});
  try {
    const parsed = new URL(body.url);
    if (!parsed.hostname.endsWith('.public.blob.vercel-storage.com') && !parsed.hostname.endsWith('.blob.vercel-storage.com')) {
      return NextResponse.json({error:'Archivo fuera del almacenamiento permitido.'},{status:400});
    }
    await del(body.url);
    return NextResponse.json({ok:true});
  } catch {
    return NextResponse.json({error:'No se pudo eliminar el archivo.'},{status:400});
  }
}
