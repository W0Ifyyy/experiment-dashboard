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
    <main className="w-full h-full flex justify-center items-center flex-col">
      <div className="p-4 border-2 rounded-md">
        <h1 className="text-xl">Profile</h1>
        <span>
          Profile page:{" "}
          {data === "nothing" ? (
            "No information found..."
          ) : (
            <Link href={`/profile/${data.id}-${data.username}`}>
              {data.username}
            </Link>
          )}
        </span>
        <br />
        <button
          className=" text-red-400 hover:text-red-500 focus:hover:text-red-600 hover:cursor-pointer"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </main>
  );
}
