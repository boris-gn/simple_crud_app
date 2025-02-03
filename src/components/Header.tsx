import React from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";

const Header: React.FC = () => {
  return  (
    <nav className="bg-gray-800 text-white p-4 flex justify-between align-center">
      <div className="flex justify-start gap-4">
        <Link className="text-white hover:text-blue-800 active:text-blue-900 transition duration-300" href="/">Home</Link>
        <Link className="text-white hover:text-blue-800 active:text-blue-900 transition duration-300" href="/dashboard">Dashboard</Link>
        <Link className="text-white hover:text-blue-800 active:text-blue-900 transition duration-300" href="/posts">Posts</Link>
      </div>
      <button onClick={() => signOut()} className="px-4  bg-red-500 text-white rounded">Sign out</button>
    </nav>
  );
};
export default Header;
