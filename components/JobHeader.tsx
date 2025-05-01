"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import LogOutButton from "./LogOutButton";
import { SearchJobService } from "@/services/JobServices";
import { useState } from "react";
import { useRouter } from "next/navigation";
import LogOuutButton from "./LogOuutButton";

export default function JobHeader() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearch = async () => {
    if (searchTerm.trim() === "") {
      return;
    }
    try {
      const response = await SearchJobService(searchTerm);
      if (response) {
        console.log("Search results:", response);
        router.push(`/jobs/search/${searchTerm}`);
      } else {
        console.error("No jobs found");
      }
    } catch (error) {
      console.error("Error searching for jobs:", error);
    }
    setSearchTerm("");
  };

  return (
    <div className="p-4 bg-[#FFFFFF] w-[100%] px-10">
      <div className="justify-between flex items-center">
        <Link href="/">
          <div className="text-black text-3xl font-bold">SeekaJob</div>
        </Link>
        <div className="flex flex-row gap-4 w-1/2 items-center">
          <Input
            placeholder="Search Jobs"
            className=""
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
          <Button
            className="bg-[#FFFFFF] text-black px-4 py-2 rounded-md hover:bg-[#F3F3F3] hover:text-black "
            variant={"outline"}
            onClick={handleSearch}
          >
            Search
          </Button>
          <LogOutButton />
          <LogOuutButton />
        </div>
      </div>
    </div>
  );
}
