// GEÇİCİ: NextAuth tamamen devre dışı bırakıldı

export const authOptions = {
    // Dummy config
  }
  
  /*
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
          if (!credentials?.email) return null
  
          try {
            let user = await prisma.user.findUnique({
              where: { email: credentials.email }
            })
  
            if (!user) {
              user = await prisma.user.create({
                data: {
                  email: credentials.email,
                  name: credentials.name || credentials.email
                }
              })
            }
  
            return {
              id: user.id,
              email: user.email,
              name: user.name
            }
          } catch (error) {
            console.error("Auth error:", error)
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
  */