import { NextRequest, NextResponse } from "next/server";
import { initializeDatabase, hashPassword, isDbReady } from "@/lib/db";
import mysql from "mysql2/promise";

export async function POST(req: NextRequest) {
  if (!isDbReady()) {
    return NextResponse.json(
      { error: "Database is not available" },
      { status: 503 }
    );
  }

  try {
    const { name, username, email, password } = await req.json();

    if (!name || !username || !email || !password) {
      return NextResponse.json(
        { error: "name, username, email, and password are required" },
        { status: 400 }
      );
    }

    if (String(password).length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    const dbPool = await initializeDatabase();
    const normalizedUsername = String(username).trim().toLowerCase();
    const normalizedEmail = String(email).trim().toLowerCase();
    const passwordHash = hashPassword(String(password));

    const [insertResult] = await dbPool!.query<mysql.ResultSetHeader>(
      `INSERT INTO admin_users (full_name, username, email, password_hash)
       VALUES (?, ?, ?, ?)`,
      [String(name).trim(), normalizedUsername, normalizedEmail, passwordHash]
    );

    return NextResponse.json(
      {
        ok: true,
        user: {
          id: (insertResult as any).insertId,
          name: String(name).trim(),
          username: normalizedUsername,
          email: normalizedEmail,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    if (error?.code === "ER_DUP_ENTRY") {
      return NextResponse.json(
        { error: "Username or email already exists" },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: "Failed to create account" },
      { status: 500 }
    );
  }
}
