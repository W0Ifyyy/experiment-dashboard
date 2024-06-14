"use client";
import axios from "axios";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PostRoom() {
  const router = useRouter();
  const [user, setUser]: any = useState("nothing");
  const [posts, setPosts]: any = useState("nothing");
  const [text, setText]: any = useState("");

  async function getPosts() {
    try {
      const response = await axios.get("/api/post-room/getPosts");
      setUser(response.data.user);
      setPosts(response.data.posts);
    } catch (error: any) {
      console.error("An error occured: " + error);
      toast.error(error);
    }
  }

  async function createPost() {
    try {
      const response = await axios.post("/api/post-room/createPost", { text });
      console.log("Post created!", response.data);
      toast.success("Post created!");
      setText("");
      getPosts();
    } catch (error: any) {
      console.error("An error occurred: ", error);
      toast.error(error.message || "An error occurred while creating the post");
    }
  }

  async function deletePost(postID: string) {
    try {
      const response = await axios.delete("/api/post-room/deletePost", {
        data: { postID },
      });
      console.log("Post deleted: ", response.data);
      toast.success("Post deleted!");
      getPosts();
    } catch (error: any) {
      toast.error("An error occured: " + error);
      console.error("An error occured: " + error);
    }
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <main className="flex flex-grow flex-col items-center p-4 bg-gray-50">
      <div className="flex flex-col w-full max-w-xl bg-white rounded shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">This is post-room</h1>
        <span className="text-gray-700 mb-4">
          Logged as: <b>{user.username}</b>
        </span>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border-2 rounded p-2 mb-4 w-full"
          placeholder="Post text here..."
        ></textarea>
        <button
          className="p-2 mb-4 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white rounded"
          onClick={createPost}
        >
          Create post
        </button>
      </div>
      <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 mt-6 flex flex-col items-center">
        {posts === "nothing" || posts.length <= 0 ? (
          <span className="text-gray-600">There is nothing there...</span>
        ) : (
          posts.map((post: any, index: number) => {
            const isUsersPost = user.username === post.username;
            const postAlignmentClass = isUsersPost ? "self-end" : "self-start";
            const postBackgroundClass = isUsersPost
              ? "bg-blue-100 border-blue-300"
              : "bg-green-100 border-green-300";

            // Format date
            const formattedDate = new Date(post.date).toLocaleString();

            return (
              <div
                key={index}
                className={`w-4/5 md:w-2/3 lg:w-1/2 border-2 rounded p-4 my-2 ${postBackgroundClass} ${postAlignmentClass} flex flex-col ${
                  isUsersPost ? "items-end" : "items-start"
                }`}
              >
                <span
                  className={`text-gray-500 text-sm mt-2 ${
                    isUsersPost ? "self-start" : "self-end"
                  }`}
                >
                  {formattedDate}
                </span>
                <span className="font-bold text-gray-800">{post.username}</span>
                <span className="text-gray-700 mt-1">{post.text}</span>
                {user.isAdmin && (
                  <button
                    className="w-auto mt-2 px-2 py-1 bg-red-400 hover:bg-red-300 active:bg-red-600 transition text-white rounded"
                    onClick={() => deletePost(post._id)}
                  >
                    Delete Post
                  </button>
                )}
              </div>
            );
          })
        )}
      </div>
    </main>
  );
}
