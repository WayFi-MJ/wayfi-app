import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // No auth for now - will be added later
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}