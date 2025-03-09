import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "./lib/dbConnect";
import User from "./backend/models/User";
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [

    // OAuth authentication providers...
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await dbConnect();
        const user = await User.findOne({ email: credentials.email });

        if (!user) {
          throw new Error("User not found");
        }

        // Check if the user signed up via Google
        if (user.authProvider === "google") {
          throw new Error("Please use Google Sign-In");
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        return { id: user._id, name: user.name, email: user.email };
      },
    }),
  ],

  callbacks: {
    async session({ session, user }) {
      if (user) {
        session.user.id = user.id;
      }
      return session;
    },
  },

  pages: {
    signIn: "/auth/login",
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
})