import { NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

const schema = z.object({
	email: z.string().email(),
	password: z.string().min(6),
	role: z.enum(["STREAMER", "CLIPPER"]),
});

export async function POST(req: Request) {
	try {
		const body = await req.json();
		const { email, password, role } = schema.parse(body);
		const existing = await prisma.user.findUnique({ where: { email } });
		if (existing) return NextResponse.json({ error: "Email in use" }, { status: 409 });
		const passwordHash = await bcrypt.hash(password, 10);
		const user = await prisma.user.create({ data: { email, passwordHash, role } });
		return NextResponse.json({ id: user.id, email: user.email, role: user.role });
	} catch (e) {
		let message = "Invalid request";
		if (typeof e === "object" && e && "message" in e) message = String((e as Error).message);
		return NextResponse.json({ error: message }, { status: 400 });
	}
}


