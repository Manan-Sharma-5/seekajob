"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";

export default function LogOutButton() {
  const router = useRouter();
  return (
    <div
      className=" p-2 rounded-full bg-black text-white flex justify-center items-center cursor-pointer"
      onClick={() => {
        router.push("/profile");
      }}
    >
      <FontAwesomeIcon icon={faUser} className="" />
    </div>
  );
}
