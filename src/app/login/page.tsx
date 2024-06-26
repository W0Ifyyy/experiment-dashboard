"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import axiosInstance from "@/helpers/axiosInstance";

interface User {
  username: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useUser();
  const [loading, setLoading] = useState(false);
  const [user, setUserState] = useState<User>({
    username: "",
    password: "",
  });

  async function onLogin() {
    try {
      setLoading(true);
      const response = await axiosInstance.post("/api/users/login", user);
      console.log("Login went successfully!", response.data.userData);
      toast.success("Logged in!");
      setUser(response.data.user);
      router.push("/post-room");
    } catch (error: any) {
      setLoading(false);
      if (error.response && error.response.data && error.response.data.error) {
        if (error.response.data.error === "User is banned!") {
          toast.error("You're banned!");
        } else {
          toast.error(error.response.data.error);
        }
      } else {
        console.log("Something went wrong: ", error.message);
        toast.error("An unexpected error occurred!");
      }
    }
  }

  return (
    <main className="w-full h-full flex flex-grow justify-center items-center bg-gray-50">
      <div className="px-12 py-8 bg-white shadow-sm rounded">
        <h1 className="my-6 text-3xl">{loading ? "Processing..." : "Login"}</h1>
        <input
          className="mb-4 w-full border-b py-2"
          type="text"
          placeholder="Username"
          value={user.username}
          onChange={(e) => setUserState({ ...user, username: e.target.value })}
        />
        <br />
        <input
          className="mb-4 w-full border-b py-2"
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={(e) => setUserState({ ...user, password: e.target.value })}
        />
        <br />
        <input
          type="submit"
          value="login"
          onClick={onLogin}
          className="w-full my-2 py-2 pt-1 bg-blue-400 hover:cursor-pointer hover:bg-blue-500 active:bg-blue-600 rounded-md text-white"
        />
        <br />
        <span>
          You want to Sign-in?{" "}
          <Link href="/signup" className="text-blue-500 ">
            Sign-in here!
          </Link>
        </span>
      </div>
    </main>
  );
}
