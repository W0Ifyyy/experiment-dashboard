"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";
import {
  isValidPassword,
  isValidUsername,
  isValidEmailFormat,
} from "@/helpers/validation";

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
  const [error, setError]: any = useState({
    errors: 0,
    errorMsg: [],
  });

  async function validation() {
    let hasError = false;
    const newErrorState: any = {
      errors: 0,
      errorMsg: [],
    };

    if (!isValidUsername(user.username)) {
      newErrorState.errors++;
      newErrorState.errorMsg.push(
        "Username should be at least 4 characters long."
      );
      hasError = true;
    }

    if (!isValidEmailFormat(user.email)) {
      newErrorState.errors++;
      newErrorState.errorMsg.push("Wrong E-mail format.");
      hasError = true;
    }

    if (!isValidPassword(user.password)) {
      newErrorState.errors++;
      newErrorState.errorMsg.push(
        "Password should be at least 8 characters long, have one special sign and one capital character."
      );
      hasError = true;
    }

    if (hasError) {
      setError(newErrorState);
    } else {
      try {
        setLoading(true);
        const response = await axios.post("/api/users/signup", user);
        console.log("Signup success!", response.data);
        toast.success("User created successfully!");
        router.push("/login");
      } catch (error: any) {
        toast.error(error.response.data.error);
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <main className="w-full h-full flex flex-grow justify-center items-center bg-gray-50">
      <div className="py-8 px-12 bg-white shadow-sm">
        <h1 className="my-6 text-3xl">{loading ? "Processing..." : "Sign-Up"}</h1>
        <input
          className="mb-4 w-full  border-b py-2"
          type="text"
          placeholder="Username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
        <br />
        <input
          className="mb-4  w-full border-b py-2"
          type="text"
          placeholder="E-mail"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <br />
        <input
          className="mb-4 w-full  border-b py-2"
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <br />
        <div id="errorDiv" className={`${error.errors <= 0 ? "hidden" : ""} flex max-w-[75%] flex-col gap-2`}>
          {error.errors > 0
            ? error.errorMsg.map((msg: any, i: number) => {
                return (
                  <span className="text-red-400" key={i}>
                    {msg}
                  </span>
                );
              })
            : null}
        </div>
        <input
          className="w-full my-2 py-2 px-3 bg-blue-400 hover:cursor-pointer hover:bg-blue-500 active:bg-blue-600 rounded-md text-white"
          type="submit"
          value="Sign-in"
          onClick={validation}
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
