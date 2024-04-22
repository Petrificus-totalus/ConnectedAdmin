"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { message } from "antd";

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
    <form onSubmit={handleSubmit}>
      <label htmlFor="Account">Account:</label>
      <input
        type="text"
        id="Account"
        value={Account}
        onChange={(e) => setAccount(e.target.value)}
      />

      <label htmlFor="Password">Password:</label>
      <input
        type="password"
        id="Password"
        value={Password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Log In</button>
    </form>
  );
}
