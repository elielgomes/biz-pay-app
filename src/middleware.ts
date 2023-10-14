import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {

  const token = req.cookies.get('bizpay.token')?.value;
  console.log("Token", token)
  
  if (!token) {
    return NextResponse.redirect(new URL('/', req.url));
  }
}

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
  ],
};