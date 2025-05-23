"use client";
import { useAuthContext } from "@/context/Auth-Context-Provider";
import Link from "next/link";

export default function EntryHeader() {
  const { user } = useAuthContext();
  return (
    <div className="p-7 bg-[#FFFFFF] w-[100%]">
      <div className="justify-between flex items-center">
        <div className="text-black text-3xl font-bold">SeekaJob</div>
        <div className="flex flex-row gap-4">
          <Link href="/recruiter">
            <div className="text-[20px] text-black hover:text-[#4793AF] cursor-pointer font-bold">
              Recruiting Developer
            </div>
          </Link>
          <Link href="/jobs">
            <div className="text-[20px] text-black hover:text-[#4793AF] cursor-pointer font-bold">
              Finding Companies
            </div>
          </Link>
          {user ? (
            <Link href="/profile">
              <div className="text-[20px] text-black hover:text-[#4793AF] cursor-pointer font-bold">
                Profile
              </div>
            </Link>
          ) : (
            <Link href="/auth/login">
              <div className="text-[20px] text-black hover:text-[#4793AF] cursor-pointer font-bold">
                Login
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
