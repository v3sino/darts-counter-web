import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase';

export const authOptions = {
	pages: {
		signIn: '/signin'
	},
  callbacks: {
     async jwt({ token, user, account, profile, isNewUser }: any) {
      if (user) {
        token.id = user.uid;
      }
      return token;
    },
    async session({ session, token, user }: any) {
      if (token) {
        if (token.id) {
          session.user.uid = token.id;
        }
      }
      return session;
    }
},
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {},
			async authorize(credentials): Promise<any> {
				return await signInWithEmailAndPassword(
					auth,
					(credentials as any).email || '',
					(credentials as any).password || ''
				)
					.then(userCredential => {
						if (userCredential.user) {
              
							return userCredential.user;
						}
						return null;
					})
					.catch(error => console.log(error))
					.catch(error => {
						const errorCode = error.code;
						const errorMessage = error.message;
						console.log(error);
					});
			}
		})
	]
};
export default NextAuth(authOptions);
