import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-grow items-center justify-center p-2 bg-gray-50">
      <div className="text-center p-20 bg-white rounded shadow-sm max-w-lg">
        <h1 className="text-4xl font-bold mb-4">Welcome to PostIt!</h1>
        <p className="text-lg mb-6">Share your thoughts and connect with others.</p>
        <Link className="py-2 px-3 border rounded border-blue-500 text-blue-500 bg-white hover:bg-blue-50 focus:bg-blue-100 transition" href={"/post-room"}>Start chatting now!</Link>
      </div>
    </div>
  );
}
