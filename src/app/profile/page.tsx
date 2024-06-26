"use client";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData]: any = useState("nothing");

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log("Something went wrong: " + error);
    }
  };

  async function getUserDetails() {
    try {
      const res = await axios.get("/api/users/profile");
      setData({ id: res.data.data._id, username: res.data.data.username });
      router.push(`/profile/${res.data.data._id}-${res.data.data.username}`);
    } catch (error: any) {
      console.log("Something went wrong! :" + error);
    }
  }

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <main className="w-full h-full flex flex-grow justify-center items-center flex-col bg-gray-50">
     <div className="p-4 flex flex-col gap-2 shadow-sm rounded-md bg-white">
  <h1 className="text-xl font-bold">Profile</h1>
  <div className="flex items-center gap-3 mt-3">
    <div className="w-12 h-12 bg-black rounded-full hover:shadow-lg transition-shadow"></div>
    <span className="font-semibold text-lg">...</span>
  </div>
  <span className="mt-2">
    Access grade:{" "}
    <span className="font-semibold text-blue-500">
      No information found...
    </span>
  </span>
  {data === "nothing" && <button
       className="mt-3 py-2 px-4 border border-red-300 rounded-md text-red-600 hover:text-red-700 focus:text-red-800 hover:bg-red-200 focus:bg-red-300 transition-all"
       onClick={logout}
     >
       Logout
     </button>}
  </div>
  </main>
  );
}


