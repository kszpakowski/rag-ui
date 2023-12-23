import NextAuth from "next-auth"
import { config } from "@/auth"

const handler = NextAuth(config) as any

export { handler as GET, handler as POST }