"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";

interface User {
  username: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User>({
    username: "",
    password: "",
  });

  async function onLogin() {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login went successfully!", response.data);
      toast.success("Logged in!");
      router.push("/profile");
    } catch (error: any) {
      console.log("Something went wrong: ", error);
    }
  }

  return (
    <main>
      <div>
        <h1>{loading ? "Processing..." : "Login Page"}</h1>
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          placeholder="username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
        <br />

        <label htmlFor="password">Password: </label>
        <input
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <br />
        <input type="submit" value="Sign-in" onClick={onLogin} />
        <br />
        <span>
          You want to Sign-in?{" "}
          <Link href="/signup" className="text-blue-500">
            Sign-in here!
          </Link>
        </span>
      </div>
    </main>
  );
}
