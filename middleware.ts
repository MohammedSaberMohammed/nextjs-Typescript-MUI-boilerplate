import { LayoutSettings } from '@/configs/layout';
import { getToken } from 'next-auth/jwt';
import { NextResponse, NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const clonedUrl = req.nextUrl.clone();
  const isProduction = process.env.NODE_ENV === 'production';
  const userSession = await getToken({req, secret: process.env.NEXTAUTH_SECRET});

  const currentPath = req.nextUrl.pathname;
  const authenticatedRoutes = ['/profile'];
  const notAuthenticatedRoutes = ['/login', '/signup'];
  const inNotAuthenticatedRoutes = notAuthenticatedRoutes.includes(currentPath); 
  const inAuthenticatedRoutes = authenticatedRoutes.includes(currentPath); 
  
  if(userSession && inNotAuthenticatedRoutes) {
    clonedUrl.pathname = LayoutSettings.redirectPathIfAuthenticated;
    
    return NextResponse.redirect(clonedUrl);
  }
  
  if(!userSession && inAuthenticatedRoutes) {
    clonedUrl.pathname = LayoutSettings.redirectPathIfNotAuthenticated;
    
    return NextResponse.redirect(clonedUrl);
  }
  
  if(isProduction) {
  //   // ! todo: Call csrf
    console.log('isProduction [Middleware]', isProduction);
  //   // const csrf = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/sanctum/csrf-cookie`);
  } 

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - static (static files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|icons|fonts|images|_next|static|favicon.ico).*)',
  ],
};