import prisma from "@/util/prismaClient";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session }: any) {
      const exUser = await prisma.user.findUnique({
        where: { email: session.user?.email },
        select: {
          id: true,
          image: true,
          nickname: true,
          name: true,
          email: true,
          emailVerified: true,
        },
      });
      session.user = exUser;
      return session;
    },
  },
});
