"use client";

import Link from "next/link";
import { FiLogOut, FiLoader, FiLock } from "react-icons/fi";
import { RiDashboardLine } from "react-icons/ri";
import { signIn, signOut, useSession } from "next-auth/react";

export const Header = () => {
  const { status, data } = useSession();

  console.log(status);

  const handleLogin = async () => {
    await signIn();
  };

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <header className="w-full flex items-center px-2 py-4 bg-white h-20 shadow-md ">
      <div className="w-full flex items-center justify-between max-w-7xl mx-auto">
        <Link href="/">
          <h1 className="font-bold text-2xl pl-1 hover:tracking-widest duration-300 text-[#0F172A]">
            <span className="text-blue-500">DEV</span> CONTROLE
          </h1>
        </Link>

        {status === "loading" && (
          <button className="animate-spin">
            <FiLoader size={26} className="text-green-600" />
          </button>
        )}

        {status === "unauthenticated" && (
          <button onClick={handleLogin}>
            <FiLock size={26} className="text-[#0F172A] hover:text-blue-500" />
          </button>
        )}

        {status === "authenticated" && (
          <div className="flex items-baseline gap-5">
            <Link href={"/dashboard"}>
              <RiDashboardLine
                size={26}
                className="text-[#0F172A] hover:text-blue-500"
              />
            </Link>
            <button onClick={handleLogout}>
              <FiLogOut
                size={26}
                className="text-[#0F172A] hover:text-rose-600"
              />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
