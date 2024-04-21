import getMySQLConnection from "@/lib/mysql";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const PUT = async (request) => {
  try {
    const db = await getMySQLConnection();
    const req = await request.formData();
    const { Account, Password, Access, UserID } = Object.fromEntries(req);
    const sql = `UPDATE user
           SET Account = ?, Password = ?, Access = ?
           WHERE UserID = ?`;
    const data = [Account, Password, Access, UserID];
    await db.query(sql, data);

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
