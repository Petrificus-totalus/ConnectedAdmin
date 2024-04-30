import getMySQLConnection from "@/lib/mysql";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const POST = async (request) => {
  try {
    const db = await getMySQLConnection();
    const data = await request.json();

    const { title, author, theme, date, content, AdminID } = data;
    console.log(title, author, theme, date, content, AdminID);
    const sql = `INSERT INTO story (Title, Author, Type, UploadTime, Content, AdminID) VALUES (?, ?, ?, ?, ?, ?)`;
    await db.execute(sql, [
      title,
      author,
      theme,
      date,
      content,
      parseInt(AdminID),
    ]);

    db.end();
    return new NextResponse(JSON.stringify({ status: "success" }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Database connection or query error:", error);
    db?.end();
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
