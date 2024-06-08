import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="text-center text-xl">
        <span className="text-2xl">Welcome on our website!</span>
        <br />
        <Link href="/login" className=" text-blue-500 hover:text-blue-600">
          Login
        </Link>{" "}
        or{" "}
        <Link href="/signup" className="text-blue-500 hover:text-blue-600">
          Signup
        </Link>
      </div>
    </main>
  );
}
