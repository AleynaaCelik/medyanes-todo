import { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "./prisma"
import type { Adapter } from "next-auth/adapters"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        name: { label: "Name", type: "text" }
      },
      async authorize(credentials) {
        console.log("🔐 Authorize çağrıldı:", credentials?.email)
        
        if (!credentials?.email) {
          console.log("❌ Email eksik")
          return null
        }

        try {
          let user = await prisma.user.findUnique({
            where: { email: credentials.email }
          })

          if (!user) {
            console.log("👤 Yeni kullanıcı oluşturuluyor...")
            user = await prisma.user.create({
              data: {
                email: credentials.email,
                name: credentials.name || credentials.email
              }
            })
          }

          console.log("✅ Kullanıcı doğrulandı:", user.email)
          return {
            id: user.id,
            email: user.email,
            name: user.name
          }
        } catch (error) {
          console.error("❌ Database hatası:", error)
          return null
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
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
  
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string
      }
      return session
    }
  }
}