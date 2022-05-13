import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import EmailProvider from 'next-auth/providers/email'
import Credentials from 'next-auth/providers/credentials'

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Credentials({
        name: 'Custom Login',
        credentials: {
          email: { label: 'Correo:', type: 'email', placeholder: 'correo@google.com'  },
          password: { label: 'Contraseña:', type: 'password', placeholder: 'Contraseña'  },
        },
        async authorize(credentials) {
          console.log({credentials})
          // return { name: 'Juan', correo: 'juan@google.com', role: 'admin' };
  
          //TODO
          //crear funcion que retorne un usuario en el backend
          // return await dbUsers.checkUserEmailPassword( credentials!.email, credentials!.password );
  
  
        }
      }),
  ],


  callbacks: {

    async jwt({token, account, user}){
      
      if (account)
      {
        token.accessToken = account.access_token;

        switch (account.type) {
          case 'oauth':
            token.user = user;
            break;
          
          case 'credentials':
            token.user = user;
            break;
        }
      }
      return token
    },
    
    async session ({ session, token, user }) {
      
      session.accessToken = token.accessToken;
      session.user = token.user as any;

      return session
    }


  }

});