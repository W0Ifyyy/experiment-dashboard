"use client";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import axiosInstance from "@/helpers/axiosInstance";

export default function ProfilePageId({ params }: any) {
  const [data, setData]: any = useState({
    id: params.id.split("-")[0],
    username: params.id.split("-")[1],
  });
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();
  async function isAdminCheck() {
    try {
      const res = await axiosInstance.get("/api/users/profile");
      setIsAdmin(res.data.data.isAdmin);
    } catch (error: any) {
      console.log("Something went wrong! :" + error);
    }
  }

  useEffect(() => {
    isAdminCheck();
  }, []);
  return (
    <main className="w-full h-full flex flex-grow justify-center items-center flex-col bg-gray-50">
     <div className="p-8 flex flex-col gap-2 shadow-sm rounded-md bg-white">
  <h1 className="text-xl font-bold">Profile</h1>
  <div className="flex items-center gap-3 mt-3">
    <div className="w-12 h-12 bg-black rounded-full hover:shadow-lg transition-shadow"></div>
    <span className="font-semibold text-lg">{data.username}</span>
  </div>
  <span className="mt-2">
    Access grade:{" "}
    <span className="font-semibold text-blue-500">
      {isAdmin ? "Admin" : "User"}
    </span>
  </span>
  {isAdmin && (
    <Link
      href="/dashboard"
      className="mt-3 py-2 px-4 border border-green-300 rounded-md text-green-600 hover:text-green-700 focus:text-green-800 hover:bg-green-200 focus:bg-green-300 transition-all"
    >
      Admin Dashboard
    </Link>
  )}
</div>

    </main>
  );
}
