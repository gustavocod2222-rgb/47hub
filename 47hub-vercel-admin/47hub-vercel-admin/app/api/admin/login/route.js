import { NextResponse } from 'next/server';
import { makeSession, sessionCookie, verifyCredentials, sameOrigin } from '../../../../lib/auth';

export async function POST(request) {
  if (!sameOrigin(request)) return NextResponse.json({error:'Origen no permitido.'},{status:403});
  const body = await request.json().catch(()=>({}));
  if (!verifyCredentials(body.username, body.password)) {
    return NextResponse.json({error:'Usuario o contraseña incorrectos.'},{status:401});
  }
  const response = NextResponse.json({ok:true});
  response.headers.append('Set-Cookie', sessionCookie(makeSession()));
  return response;
}
