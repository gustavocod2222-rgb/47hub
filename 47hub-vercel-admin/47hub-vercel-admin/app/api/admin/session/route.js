import { NextResponse } from 'next/server';
import { isAdmin } from '../../../../lib/auth';
export async function GET(request) {
  return isAdmin(request) ? NextResponse.json({ok:true}) : NextResponse.json({error:'No autorizado.'},{status:401});
}
