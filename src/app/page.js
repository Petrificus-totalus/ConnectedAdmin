"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { message } from "antd";
import styles from "./login.module.css";

export default function LoginForm() {
  const [Account, setAccount] = useState("");
  const [Password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await signIn("credentials", {
      redirect: false, // Do not redirect after sign in
      Account,
      Password,
    });
    if (!result.error) {
      router.replace("/home/usermanage");
      message.success("Logged in successfully");
    } else {
      message.error("Logged in failed");
      console.error(result.error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <label htmlFor="Account" className={styles.label}>
        Account:
      </label>
      <input
        type="text"
        id="Account"
        value={Account}
        onChange={(e) => setAccount(e.target.value)}
        className={styles.input}
      />

      <label htmlFor="Password" className={styles.label}>
        Password:
      </label>
      <input
        type="password"
        id="Password"
        value={Password}
        onChange={(e) => setPassword(e.target.value)}
        className={styles.input}
      />

      <button type="submit" className={styles.button}>
        Log In
      </button>
    </form>
  );
}
