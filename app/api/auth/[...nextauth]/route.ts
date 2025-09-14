import NextAuth, { type NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import type { JWT } from "next-auth/jwt";

type AppUser = { id: string; email: string; role: "STREAMER" | "CLIPPER" };

export const authOptions: NextAuthOptions = {
	session: { strategy: "jwt" },
	providers: [
		Credentials({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) return null;
				const user = await prisma.user.findUnique({ where: { email: credentials.email } });
				if (!user) return null;
				const ok = await bcrypt.compare(credentials.password, user.passwordHash);
				if (!ok) return null;
				const u: AppUser = { id: user.id, email: user.email, role: user.role };
				return u as unknown as { id: string; email: string };
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			const t = token as JWT & { userId?: string; role?: AppUser["role"] };
			if (user) {
				const u = user as unknown as AppUser;
				t.userId = u.id;
				t.role = u.role;
			}
			return t;
		},
		async session({ session, token }) {
			const t = token as JWT & { userId?: string; role?: AppUser["role"] };
			const s = session as typeof session & { userId?: string; role?: AppUser["role"] };
			s.userId = t.userId;
			s.role = t.role;
			return s;
		},
	},
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };


