import getMySQLConnection from "@/lib/mysql";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const db = await getMySQLConnection();

    const [rows] = await db.execute("SELECT * FROM user");
    db.end();
    return NextResponse.json({ data: rows }, { status: 200 });
  } catch (error) {
    console.error("Database connection or query error:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
};
