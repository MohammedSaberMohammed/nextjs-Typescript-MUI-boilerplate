import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
// Apis
import { Endpoints } from '@/services/apis';
// Models
import { LoginResponse } from '@/models/auth';

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    CredentialsProvider({
      credentials: {},
      // @ts-ignore
      async authorize(credentials) {
        // Add logic here to look up the user from the credentials supplied
        // console.log('===========================================', credentials.formValues.phoneNumber);
        
        // await fetch('https://biker.jadeer.co/sanctum/csrf-cookie');
        const response = await Endpoints.auth.login({
          phone: '0531437350',
          password: 'fflxtoyhqkglo'
        });

        console.log({response, credentials});

        if (response && response.ok) {
          return response.data as LoginResponse;
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