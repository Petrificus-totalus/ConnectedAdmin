import React from "react";
import Menulist from "@/components/menu/Menulist.jsx";
import styles from "./home.module.css";

export default function layout({ children }) {
  return (
    <div className={styles.container}>
      <Menulist />
      <div className={styles.content}>{children}</div>
    </div>
  );
}
