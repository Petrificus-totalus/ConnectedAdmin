import getMySQLConnection from "@/lib/mysql";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const POST = async (request) => {
  try {
    const db = await getMySQLConnection();
    const req = await request.formData();
    const { Account, Password } = Object.fromEntries(req);
    console.log(Account, Password);
    const sql = `SELECT * FROM admin WHERE Account = ? AND Password = ?`;
    const data = [Account, Password];
    const [row] = await db.execute(sql, data);
    console.log(row);
    if (row.length > 0) {
      db.end();
      return new NextResponse(JSON.stringify({ status: "success" }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      db.end();
      return new NextResponse(JSON.stringify({ status: "failed" }), {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
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
