import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import getMySQLConnection from "@/lib/mysql";

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        Account: {},
        Password: {},
      },
      authorize: async (credentials) => {
        const { Account, Password } = credentials;
        // const saltRounds = 10; // Higher salt rounds increase security but also increase processing time
        // try {
        //   const hashedPassword = await bcrypt.hash(Password, saltRounds);
        //   console.log(hashedPassword);
        //   const db = await getMySQLConnection();

        //   // 1,'admin1','\'123456\'',480123456,'\'All\'','2000-01-01'
        //   await db.execute("INSERT INTO admin VALUES (?, ?, ?, ?, ?, ?)", [
        //     3,
        //     Account,
        //     hashedPassword,
        //     482222226,
        //     "All",
        //     "2024-2-01",
        //   ]);
        //   //   return hashedPassword;
        // } catch (error) {
        //   console.error("Error hashing password:", error);
        //   throw error;
        // }

        try {
          const db = await getMySQLConnection();

          const [rows] = await db.execute(
            "SELECT * FROM admin WHERE Account = ?",
            [Account]
          );
          if (rows.length === 0) {
            throw new Error("No user found");
          }

          const user = rows[0];

          const isValid = await bcrypt.compare(Password, user.Password);

          if (isValid) {
            db.end();
            console.log("user");
            console.log(user);
            const { AdminID, Account } = user;
            return { AdminID, Account }; // Successfully authenticated
          } else {
            db.end();
            throw new Error("Incorrect password");
          }
        } catch (error) {
          throw new Error("Unable to log in");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // When user signs in, add the user ID to the token
      if (user) {
        token.AdminID = user.AdminID;
      }
      return token;
    },
    async session({ session, token }) {
      // Pass the user ID from the JWT to the session object
      session.user.AdminID = token.AdminID;

      return session;
    },
  },
  // session: {
  //   strategy: "jwt",
  // },
  session: {
    jwt: true,
  },
  //   Add further configurations as needed
});
