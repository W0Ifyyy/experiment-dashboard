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
      const res = await axios.get("/api/dashboard/displayUsers");
      setUsers(res.data.data);
      setLogged(res.data.user);
    } catch (error: any) {
      console.error("Something went wrong: " + error);
      toast.error("Unauthorized");
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

  async function deleteUser(userID: string) {
    try {
      const response = await axios.delete("/api/users/deleteUser", {
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

  async function banUser(userID: string) {
    try {
      const response = await axios.delete("/api/users/banUser", {
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
      <button
        className="my-2 p-2 bg-blue-300 hover:bg-blue-400 active:bg-blue-500 rounded text-white "
        onClick={logout}
      >
        Logout
      </button>
    </main>
  );
}
