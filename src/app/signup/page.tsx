"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";

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
    <main className="w-full h-full flex justify-center items-center">
      <div>
        <h1 className="my-6 text-3xl">
          {loading ? "Processing..." : "Sign-Up"}
        </h1>
        <input
          className="mb-4 w-full border-b py-2"
          type="text"
          placeholder="Username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
        <br />
        <input
          className="mb-4 w-full border-b py-2"
          type="text"
          placeholder="E-mail"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <br />
        <input
          className="mb-4 w-full border-b py-2"
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <br />
        <input
          className="w-full my-2 py-2 pt-1 bg-blue-400 hover:cursor-pointer hover:bg-blue-500 active:bg-blue-600 rounded-md text-white"
          type="submit"
          value="Sign-in"
          onClick={onSignup}
        />
        <br />
        <span>
          You want to log in?{" "}
          <Link href="/login" className="text-blue-500">
            Login here!
          </Link>
        </span>
      </div>
    </main>
  );
}
