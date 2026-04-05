import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_ROUTES = ['/login', '/register'];
const PROTECTED_PREFIX = ['/dashboard', '/mahasiswa', '/profile'];

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Read auth from cookie (we'll set this on login)
  const isAuthenticated = req.cookies.get('is_authenticated')?.value === 'true';

  const isPublicRoute = PUBLIC_ROUTES.some((route) => pathname.startsWith(route));
  const isProtectedRoute = PROTECTED_PREFIX.some((prefix) => pathname.startsWith(prefix));

  // Not authenticated → trying to access protected route → redirect to login
  if (!isAuthenticated && isProtectedRoute) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Already authenticated → trying to access login/register → redirect to dashboard
  if (isAuthenticated && isPublicRoute) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};