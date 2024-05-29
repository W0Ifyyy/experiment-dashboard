"use client";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
1;
export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");

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
      setData(res.data.data._id);
    } catch (error: any) {
      console.log("Something went wrong! :" + error);
    }
  }

  return (
    <div>
      <h1>Profile</h1>
      <span>
        Profile page:{" "}
        {data === "nothing" ? (
          "No information found..."
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </span>
      <button onClick={getUserDetails}>Get user details</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
