import getMySQLConnection from "@/lib/mysql";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

// export const dynamic = "force-dynamic";

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
    // console.log(res.affectedRows);

    // revalidatePath("/home/usermanage");
    db.end();
    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error("Database connection or query error:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
};
