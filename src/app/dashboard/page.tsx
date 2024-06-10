"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Dashboard() {
  const router = useRouter();
  const [users, setUsers] = useState<any[]>([]);
  const [logged, setLogged]: any = useState(null);

  async function getUsers() {
    try {
      const res = await axios.get("/api/users/dashboard");
      setUsers(res.data.data);
      setLogged(res.data.user);
    } catch (error: any) {
      console.error("Something went wrong: " + error);
      toast.error("Failed to fetch users!");
      router.push("/profile");
    }
  }

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log("Something went wrong: " + error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <main className="flex flex-col justify-center items-center">
      <h1>This is the dashboard!</h1>
      <span>Logged as: {logged === null ? "" : <b>{logged.username}</b>}</span>
      <br />
      {users.length === 0 ? (
        <span>There is nothing here...</span>
      ) : (
        <table className=" border">
          <thead className="border">
            <tr>
              <th className="border">ID</th>
              <th className="border">Username</th>
              <th className="border">Email</th>
              <th className="border">Admin</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td className="border">{user._id}</td>
                <td className="border">{user.username}</td>
                <td className="border">{user.email}</td>
                <td className="border">{user.isAdmin ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button
        className="my-2 p-2 bg-red-300 hover:bg-red-400 focus:bg-red-500 rounded text-white "
        onClick={logout}
      >
        Logout
      </button>
    </main>
  );
}