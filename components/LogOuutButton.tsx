"use client";
import { LogoutService } from "@/services/AuthServices";
import { useRouter } from "next/navigation";

export default function LogOuutButton() {
  const router = useRouter();
  return (
    <div
      className=" w-[100px] bg-white text-black flex justify-center items-center cursor-pointer"
      onClick={async () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        await LogoutService();
        router.push("/");
      }}
    >
      Log Out
    </div>
  );
}
