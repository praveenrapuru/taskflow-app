import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import Task from "@/models/Task";
import { initDB } from "@/lib/sequelize";
import { verifyToken } from "@/lib/auth";

async function getUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return null;
  return verifyToken(token);
}

export async function GET() {
  await initDB();

  const user = await getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const where = user.role === "ADMIN" ? {} : { userId: user.id };
  const tasks = await Task.findAll({ where, order: [["createdAt", "DESC"]] });

  return NextResponse.json(tasks);
}

export async function POST(req: Request) {
  await initDB();

  const user = await getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { title } = await req.json();

  const task = await Task.create({
    title,
    userId: user.id,
  });

  return NextResponse.json(task);
}

export async function PUT(req: Request) {
  await initDB();

  const user = await getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, ...data } = await req.json();

  const task = await Task.findByPk(id);
  if (!task) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (user.role !== "ADMIN" && task.userId !== user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await Task.update(data, { where: { id } });
  return NextResponse.json({ message: "Updated" });
}

export async function DELETE(req: Request) {
  await initDB();

  const user = await getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await req.json();

  const task = await Task.findByPk(id);
  if (!task) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (user.role !== "ADMIN" && task.userId !== user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await Task.destroy({ where: { id } });
  return NextResponse.json({ message: "Deleted" });
}
