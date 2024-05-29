"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface User {
  username: string;
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User>({
    username: "",
    email: "",
    password: "",
  });

  async function onSignup() {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success!", response.data);
      toast.success("User created succesfully!");
      router.push("/login");
    } catch (error: any) {
      console.log("An error occured: " + error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <div>
        <h1>{loading ? "Processing..." : "Sign-Up Page"}</h1>
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          placeholder="email"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
        <br />
        <label htmlFor="email">E-mail: </label>
        <input
          type="text"
          placeholder="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <br />
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <br />
        <input type="submit" value="Sign-in" onClick={onSignup} />
      </div>
    </main>
  );
}
