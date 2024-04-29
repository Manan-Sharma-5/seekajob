import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-[#FFFFFF] min-h-screen flex justify-center items-center">
      <div className="flex flex-col items-center justify-between gap-12 w-[100%]">
        <Image
          src="/Job-Hunting-Illustration.jpg"
          width={400}
          height={400}
          alt={"Job Image"}
        />
        <div className="text-4xl font-bold">Your Search for job ends here</div>
        <div className="text-2xl text-center w-1/2">
          Are you ready to take the next step in your professional journey? Look
          no further! Our platform is your gateway to a world of exciting job
          opportunities tailored to your skills and aspirations.
        </div>
        <div>
          <Button asChild variant={"outline"}>
            <Link href="/jobs">Get Started</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
