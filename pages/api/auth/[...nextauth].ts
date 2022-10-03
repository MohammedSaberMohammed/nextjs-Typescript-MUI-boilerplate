import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
// Apis
import { Endpoints } from '@/services/apis';
// Models
import { LoginResponse } from '@/models/auth';

interface Credentials {
  callbackUrl: string;
  csrfToken: string;
  json: string;
  password: string;
  phone: string;
  redirect: string
}

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    CredentialsProvider({
      credentials: {},
      // @ts-ignore
      async authorize(credentials: Credentials) {        
        // await fetch('https://biker.jadeer.co/sanctum/csrf-cookie');
        const response = await Endpoints.auth.login({
          // phone: '0531437350',
          // password: 'Aa123456'         
          phone: credentials.phone,
          password: credentials.password
        });

        if (response && response.ok) {
          return response.data as LoginResponse;
        }

        if(response && !response.ok) {

          throw new Error('INVALID_CREDENTIALS');
        }
        
        return null;
      }
    })
  ],
  callbacks: {
    async session({ session,  token}) {
      if(session) {
        return {
          ...session,
          user: {
            ...session.user,
            ...token
          }
        };
      }

      return session;
    },
    async jwt({ token, user }) {

      return token ? {...token, ...user} : token;
    }
  }
});