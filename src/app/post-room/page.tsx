"use client";
import axios from "axios"; 
import toast from "react-hot-toast";
import { useState, useEffect } from "react";

export default function PostRoom() {
  const [user, setUser]: any = useState(null); 
  const [posts, setPosts]: any = useState([]); 
  const [text, setText]: any = useState("");
  const [page, setPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(1); 

  // Function to get posts with pagination
  async function getPosts(page: number) {
    try {
      const response = await axios.get(`/api/post-room/getPosts?page=${page}&limit=10`); 
      setUser(response.data.user); 
      setPosts(response.data.posts); 
      setTotalPages(response.data.totalPages);
    } catch (error: any) {
      console.error("An error occurred: " + error);
      toast.error(error.message || "An error occurred while fetching posts");
    }
  }

  // Function to create a new post
  async function createPost() {
    try {
      const response = await axios.post("/api/post-room/createPost", { text }); 
      console.log("Post created!", response.data); 
      toast.success("Post created!"); 
      setText("");
      getPosts(page);
    } catch (error: any) {
      console.error("An error occurred: ", error); 
      toast.error(error.message || "An error occurred while creating the post");
    }
  }

  // Function to delete a post
  async function deletePost(postID: string) {
    try {
      const response = await axios.delete("/api/post-room/deletePost", {
        data: { postID }, 
      });
      console.log("Post deleted: ", response.data); 
      toast.success("Post deleted!");
      getPosts(page); 
    } catch (error: any) {
      toast.error("An error occurred: " + error);
      console.error("An error occurred: " + error);
    }
  }

  useEffect(() => {
    getPosts(page); // Fetch posts when the component mounts or when the page state changes
  }, [page]); 

  // Handlers for pagination
  const handleNextPage = () => {
    if (page < totalPages) { // Check if the current page is less than the total pages
      setPage(page + 1); // Increment the page state
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) { // Check if the current page is greater than 1
      setPage(page - 1); // Decrement the page state
    }
  };

  return (
    <main className="flex flex-grow flex-col items-center p-4 bg-gray-50">
      <div className="flex flex-col w-full max-w-xl bg-white rounded shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">This is post-room</h1>
        {user && (
          <span className="text-gray-700 mb-4">
            Logged in as: <b>{user.username}</b> 
          </span>
        )}
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
        {posts.length === 0 ? ( // Check if there are no posts
          <span className="text-gray-600">There is nothing there...</span> // Display message if no posts
        ) : (
          posts.map((post: any, index: number) => { 
            const isUsersPost = user?.username === post.username; 
            const postAlignmentClass = isUsersPost ? "self-end" : "self-start"; 
            const postBackgroundClass = isUsersPost
              ? "bg-blue-100 border-blue-300"
              : "bg-green-100 border-green-300"; 

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
                {(user?.isAdmin || isUsersPost) && (
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
      <div className="flex justify-between mt-6 w-full max-w-xl">
        <button
          onClick={handlePreviousPage} 
          disabled={page === 1} 
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
        >
          Previous
        </button>
        <button
          onClick={handleNextPage} 
          disabled={page === totalPages} 
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
    </main>
  );
}
