import React from "react";
import RecruiterHeader from "@/components/RecruiterHeader";
import Form from "./Form";

export default function page() {
  return (
    <div className="items-center justify-center flex flex-col">
      <RecruiterHeader />
      <div className="w-[100%] px-10">
        <div className="text-2xl font-bold w-[100%]">
          Create a new job posting
        </div>
        <div className="p-10">
          <Form />
        </div>
      </div>
    </div>
  );
}
