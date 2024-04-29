import Link from "next/link";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function JobHeader() {
  return (
    <div className="p-4 bg-[#FFFFFF] w-[100%] px-10">
      <div className="justify-between flex items-center">
        <Link href="/jobs">
          <div className="text-black text-3xl font-bold">SeekaJob</div>
        </Link>
        <div className="flex flex-row gap-4 w-1/2 items-center">
          <Input placeholder="Search Jobs" className="" />
          <Button
            className="bg-[#FFFFFF] text-black px-4 py-2 rounded-md hover:bg-[#F3F3F3] hover:text-black "
            variant={"outline"}
          >
            Search
          </Button>
          <div className=" p-3 rounded-full bg-black text-white flex justify-center items-center">
            MS
          </div>
        </div>
      </div>
    </div>
  );
}
