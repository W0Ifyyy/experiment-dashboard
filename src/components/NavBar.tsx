"use client";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

export default function NavBar() {
  const { user, setUser } = useUser();
  const router = useRouter();

  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      setUser(null);
      router.push("/login");
    } catch (error: any) {
      console.log("Something went wrong: " + error);
    }
  };

  const handleClickOutside = (event: any) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setShowPopup(false);
    }
  };

  async function checkIfLoggedIn() {
    try {
      const response = await axios.get("/api/users/profile");
      setUser(response.data.data);
    } catch (error: any) {
      if (error.response && error.response.status === 500) {
        setUser(null);
      } else {
        console.error("An unexpected error occurred: " + error);
      }
    }
  }

  useEffect(() => {
    checkIfLoggedIn();
  }, []);

  useEffect(() => {
    if (showPopup) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showPopup]);

  return (
    <nav className="p-3 flex justify-between items-center shadow-sm bg-white">
      <div>
        <span className="font-medium text-xl">
          <Link href="/">Post<span className="font-bold">It</span></Link>
        </span>
      </div>
      <div className="flex items-center gap-4">
        {user === null ? (
          <>
            <Link href="/signup" className="px-2 min-w-15 py-1 rounded hover:bg-slate-100 transition">
              Sign-up
            </Link>
            <Link href="/login" className="px-3 min-w-15 py-1 border rounded-md bg-blue-300 hover:bg-blue-400 active:bg-blue-500 transition">
Login
            </Link>
          </>
        ) : (
          <div className="relative">
          <div
            className="w-10 h-10 bg-black rounded-full cursor-pointer hover:shadow-black hover:shadow-sm  transition"
            onClick={togglePopup}
          ></div>
          {showPopup && (
            <div ref={popupRef} className="absolute flex items-center whitespace-nowrap flex-col gap-2 top-12 right-0 bg-white shadow-lg border rounded p-4">
              <Link href={"/post-room"} className=" px-2 py-1 hover:bg-gray-300 active:bg-gray-400 transition rounded">Post-room</Link>
              <Link href={"/profile"} className=" px-2 py-1 hover:bg-gray-300 active:bg-gray-400 transition rounded">Profile</Link>
              <button
                onClick={logout}
                className=" px-2 py-1 bg-red-300 hover:bg-red-400 active:bg-red-500 transition rounded"
              >
                Logout
              </button>
            </div>
          )}
        </div>
        )}
      </div>
    </nav>
  );
}
