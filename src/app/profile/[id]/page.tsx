"use client";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProfilePageId({ params }: any) {
  const [data, setData]: any = useState({
    id: params.id.split("-")[0],
    username: params.id.split("-")[1],
  });
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();
  async function isAdminCheck() {
    try {
      const res = await axios.get("/api/users/profile");
      setIsAdmin(res.data.data.isAdmin);
    } catch (error: any) {
      console.log("Something went wrong! :" + error);
    }
  }

  useEffect(() => {
    isAdminCheck();
  }, []);
  return (
    <main className="w-full h-full flex flex-grow justify-center items-center flex-col">
      <div className="p-4 border-2 rounded-md">
        <h1 className="text-xl">Profile</h1>
        <span>
          Username: <span className="font-semibold">{data.username}</span>
        </span>
        <span>
          <br />
          Access grade:{" "}
          {isAdmin ? (
            <span className="font-semibold text-blue-300">Admin</span>
          ) : (
            <span className="font-semibold text-blue-300">User</span>
          )}
          {isAdmin && (
            <>
              <br />
              <Link
                href={"/dashboard"}
                className="text-green-200 hover:text-green-300 focus:text-green-400"
              >
                Go to admin dashboard!
              </Link>
            </>
          )}
        </span>
        <br />
      </div>
    </main>
  );
}
