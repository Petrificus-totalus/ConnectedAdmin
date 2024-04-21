import mysql from "mysql2/promise";

const config = {
  host: "database-connected.czkyqaeyoc0g.ap-southeast-2.rds.amazonaws.com",
  port: "3306",
  user: "admin",
  password: "88888888",
  database: "connected",
};

// 创建并导出一个异步函数来获取数据库连接
async function getMySQLConnection() {
  const connection = await mysql.createConnection(config);
  return connection;
}

export default getMySQLConnection;
