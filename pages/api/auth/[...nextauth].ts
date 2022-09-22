import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    CredentialsProvider({
      credentials: {},
      async authorize(credentials) {
        // Add logic here to look up the user from the credentials supplied
        const user = { id: 55, token: 'jblkjglkjljkhljkhljhljkh', name: 'J Smith', email: 'jsmith@example.com' };

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
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