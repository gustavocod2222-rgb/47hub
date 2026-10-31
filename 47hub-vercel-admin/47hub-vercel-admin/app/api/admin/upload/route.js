import { handleUpload } from '@vercel/blob/client';
import { NextResponse } from 'next/server';
import { isAdmin, sameOrigin } from '../../../../lib/auth';

export const runtime = 'nodejs';
export async function POST(request) {
  if (!sameOrigin(request) || !isAdmin(request)) {
    return NextResponse.json({error:'Debes iniciar sesión como administrador.'},{status:401});
  }
  try {
    const body = await request.json();
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        if (!isAdmin(request)) throw new Error('No autorizado.');
        if (!pathname.startsWith('mods/') || !pathname.toLowerCase().endsWith('.jar')) {
          throw new Error('Solo se permiten archivos .jar dentro de mods/.');
        }
        return {
          allowedContentTypes: ['application/java-archive','application/octet-stream'],
          maximumSizeInBytes: 50 * 1024 * 1024,
          addRandomSuffix: true,
          tokenPayload: clientPayload || ''
        };
      },
      onUploadCompleted: async () => {}
    });
    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json({error:error.message || 'Error al autorizar la subida.'},{status:400});
  }
}
