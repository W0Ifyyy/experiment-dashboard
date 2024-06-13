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
    <div className="flex flex-col items-center">
      <h1>This is post-room</h1>
      <span>
        Logged as: <b>{user.username}</b>
      </span>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="border-2 mt-2"
        placeholder="Post text here..."
      ></textarea>
      <button
        className="p-2 my-2 bg-blue-300 hover:bg-blue-400 active:bg-blue-500 rounded"
        onClick={createPost}
      >
        Create post
      </button>
      {posts === "nothing" || posts.length <= 0 ? (
        <span>There is nothing there...</span>
      ) : (
        posts.map((post: any, index: number) => {
          return (
            <div key={index} className="flex flex-col border-2 gap-4">
              <span>{post.username}</span>
              <span>{post.text}</span>
              <span>{post.date}</span>
              {user.isAdmin ? (
                <button
                  className="px-2 py-1 bg-red-300 hover:bg-red-400 active:bg-red-500 "
                  onClick={() => deletePost(post._id)}
                >
                  Delete
                </button>
              ) : (
                ""
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
