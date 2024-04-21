"use client";
import React from "react";
import { Button, Menu } from "antd";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./menulist.module.css";

export default function Menulist() {
  const path = usePathname();
  const router = useRouter();
  return (
    <div className={styles.container}>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["/home/usermanage"]}
        selectedKeys={[path === "/home" ? "/home/usermanage" : path]}
      >
        <Menu.Item key="/home/usermanage">
          <Link href="/home/usermanage">User Management</Link>
        </Menu.Item>
        <Menu.Item key="/home/story">
          <Link href="/home/story">Story</Link>
        </Menu.Item>
        <Menu.Item key="/home/feedback">
          <Link href="/home/feedback">Feedback</Link>
        </Menu.Item>
        <Menu.Item key="/home/register">
          <Link href="/home/register">Register</Link>
        </Menu.Item>
      </Menu>
      <Button className={styles.logout} onClick={() => router.replace("/")}>
        Logout
      </Button>
    </div>
  );
}
