import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        name: { label: "Name", type: "text" }
      },
      async authorize(credentials) {
        if (!credentials?.email) return null

        // Basit auth - database olmadan
        return {
          id: credentials.email,
          email: credentials.email,
          name: credentials.name || credentials.email
        }
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/auth/signin"
  },
  debug: true // Debugging için
}