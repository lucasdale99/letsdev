import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  callbacks: {
    signIn: async ({ user }) => {
      const allowedEmail = process.env.AUTH_ALLOWED_EMAIL;
      if (user.email !== allowedEmail) {
        return false;
      }
      return true;
    },
  },
});
