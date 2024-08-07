"use client";
import axiosInstance from "@/helpers/axiosInstance";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Dashboard() {
  const router = useRouter();
  const [users, setUsers] = useState<any[]>([]);
  const [logged, setLogged]: any = useState(null);


  async function deleteUser(userID: string) {
    try {
      const response = await axiosInstance.delete("/api/users/deleteUser", {
        data: { userID },
      });
      console.log("User deleted: ", response.data);
      toast.success("User deleted!");
      getUsers();
    } catch (error: any) {
      toast.error("An error occured: " + error);
      console.error("An error occured: " + error);
    }
  }

  async function getUsers() {
    try {
      const res = await axiosInstance.get("/api/dashboard/displayUsers");
      setUsers(res.data.data);
      setLogged(res.data.user);
    } catch (error: any) {
      console.error("Something went wrong: " + error);
      toast.error("Unauthorized");
      router.push("/profile");
    }
  }

  async function banUser(userID: string) {
    try {
      const response = await axiosInstance.delete("/api/users/banUser", {
        data: { userID },
      });
      console.log("User banned: ", response.data);
      toast.success("User banned!");
      getUsers();
    } catch (error: any) {
      toast.error("An error occured: " + error);
      console.error("An error occured: " + error);
    }
  }

  useEffect(() => {
    async function getUsers() {
      try {
        const res = await axiosInstance.get("/api/dashboard/displayUsers");
        setUsers(res.data.data);
        setLogged(res.data.user);
      } catch (error: any) {
        console.error("Something went wrong: " + error);
        toast.error("Unauthorized");
        router.push("/profile");
      }
    }
    getUsers()
  });

  return (
    <main className="flex flex-grow flex-col justify-center items-center">
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
              <th className="border">Banned</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td className="border">{user._id}</td>
                <td className="border">{user.username}</td>
                <td className="border">{user.email}</td>
                <td className="border">{user.isAdmin ? "Yes" : "No"}</td>
                <td className="border">{user.isBanned ? "Yes" : "No"}</td>
                <td>
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="bg-red-300 hover:bg-red-400 active:bg-red-500 p-2 rounded"
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => banUser(user._id)}
                    className="bg-red-300 hover:bg-red-400 active:bg-red-500 p-2 rounded"
                  >
                    Ban
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
