"use client";
import Link from "next/link";
import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cookies } from "next/headers";

export default function NavBar() {
  const [logged, setLogged]: any = useState(null);
  const router = useRouter();

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      checkIfLoggedIn();
      router.push("/login");
    } catch (error: any) {
      console.log("Something went wrong: " + error);
    }
  };

  async function checkIfLoggedIn() {
    let response = await axios.get("/api/users/profile");
    setLogged(response.data.data);
    try {
    } catch (error: any) {
      console.error("An error occured: " + error);
    }
  }

  useEffect(() => {
    checkIfLoggedIn();
  }, []);

  return (
    <nav className="p-3 flex justify-between items-center shadow-sm">
      <div>
        <span className="font-medium text-xl">
          <Link href={"/"}>Logo</Link>
        </span>
      </div>
      <div className="flex items-center gap-4">
        {logged === null ? (
          <>
            <button className="px-2 min-w-15 py-1 rounded hover:bg-slate-100 transition">
              <Link href={"/signup"}>Sign-up</Link>
            </button>
            <button className="px-3 min-w-15 py-1 border rounded-md bg-blue-300 hover:bg-blue-400 active:bg-blue-500 transition">
              <Link href={"/login"}>Login</Link>
            </button>
          </>
        ) : (
          <>
            <span>Logged in as: {logged.username}</span>
            <button
              onClick={logout}
              className="px-2 py-1 bg-red-300 hover:bg-red-400 active:bg-red-500 transition rounded"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
