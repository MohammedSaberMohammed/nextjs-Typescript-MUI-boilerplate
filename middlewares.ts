// // middleware.ts
// import { NextResponse, NextRequest } from 'next/server';
// import { getSession } from 'next-auth/react';
// import { getToken } from 'next-auth/jwt';

// export async function middleware(req) {
//   req.headers.set('Authorization', 'Bearer 123');
//   // console.log('env.NEXTAUTH_SECRET', process.env);
//   console.log('getToken', await getToken({req, secret: process.env.NEXTAUTH_SECRET}));
//   return NextResponse.next();
// }

export default {};