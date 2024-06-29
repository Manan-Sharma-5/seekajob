import Link from "next/link";

export default function EntryHeader() {
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
          <div className="text-[20px] text-black hover:text-[#4793AF] cursor-pointer font-bold">
            Finding Companies
          </div>
          <div className="text-[20px] text-black hover:text-[#4793AF] cursor-pointer font-bold">
            Profile
          </div>
        </div>
      </div>
    </div>
  );
}
