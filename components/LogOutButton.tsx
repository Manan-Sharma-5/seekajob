"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Input } from "./ui/input";

export default function LogOutButton() {
  return (
    <div
      className=" p-2 rounded-full bg-black text-white flex justify-center items-center cursor-pointer"
      onClick={() => {
        signOut();
      }}
    >
      <FontAwesomeIcon icon={faUser} className="" />
    </div>
  );
}
