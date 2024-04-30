import { Inter } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AntdRegistry>
        <body className={inter.className}>
          <SessionProvider>{children}</SessionProvider>
        </body>
      </AntdRegistry>
    </html>
  );
}
