import NextAuth, { NextAuthConfig } from "next-auth";
import GitHub from "../node_modules/.pnpm/@auth+core@0.0.0-manual.e9863699/node_modules/@auth/core/providers/github.js";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/db";

export const authConfig = {
  providers: [GitHub],
  adapter: DrizzleAdapter(db),
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
  },
} satisfies NextAuthConfig;

export const { auth, handlers } = NextAuth(authConfig);
