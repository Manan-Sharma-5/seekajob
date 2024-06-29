import Link from "next/link";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import LogOutButton from "./LogOutButton";

export default function RecruiterHeader() {
  return (
    <div className="p-4 bg-[#FFFFFF] w-[100%] px-10">
      <div className="justify-between flex items-center">
        <Link href="/jobs">
          <div className="text-black text-3xl font-bold">SeekaJob</div>
        </Link>
        <div className="flex flex-row justify-center items-center">
          <Link href={"/recruiter/create-new"}>
            <Button variant={"outline"} size={"sm"} className="mr-4">
              Post a Job
            </Button>
          </Link>
          <LogOutButton />
        </div>
      </div>
    </div>
  );
}
