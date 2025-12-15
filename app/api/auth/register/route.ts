import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import { initDB } from "@/lib/sequelize";

export async function POST(req: Request) {
  try {
    await initDB();

    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "All fields required" }, { status: 400 });
    }

    const exists = await User.findOne({ where: { email } });
    if (exists) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 });
    }

    const hashed = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashed });

    return NextResponse.json({ message: "Registered successfully" });
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}
