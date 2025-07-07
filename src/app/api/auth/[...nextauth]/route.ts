// import NextAuth from "next-auth"
// import { authOptions } from "../../../lib/auth"

// const handler = NextAuth(authOptions)

// export { handler as GET, handler as POST }

// GEÇİCİ: NextAuth devre dışı
export async function GET() {
    return Response.json({ message: "Auth temporarily disabled" })
  }
  
  export async function POST() {
    return Response.json({ message: "Auth temporarily disabled" })
  }