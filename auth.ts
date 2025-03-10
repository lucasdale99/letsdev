import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  ],
  callbacks: {
    signIn: async ({ user }) => {
      const allowedEmail = process.env.AUTH_ALLOWED_EMAIL;

      // If allowedEmail is empty or undefined, log the issue
      if (!allowedEmail) {
        console.error("AUTH_ALLOWED_EMAIL environment variable is not set");
        return false;
      }

      // Check if the user's email matches the allowed email
      if (user.email !== allowedEmail) {
        console.log(
          `Email ${user.email} not authorized. Only ${allowedEmail} is allowed.`
        );
        return false;
      }

      return true;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
  trustHost: true,
  debug: process.env.NODE_ENV === "development",
});
