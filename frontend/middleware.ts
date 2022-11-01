// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  console.log(request.nextUrl.protocol);
  if(request.nextUrl.protocol === 'http:') {
    request.nextUrl.protocol = 'https:';
    return NextResponse.redirect(request.nextUrl)
  }
}