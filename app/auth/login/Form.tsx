"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function Form() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [role, setRole] = React.useState("candidate");

  return (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          name="username"
          placeholder="Enter your email address"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="grid gap-2">
        <div className="flex items-center">
          <Label htmlFor="password">Password</Label>
          <Link
            href="/forgot-password"
            className="ml-auto inline-block text-sm underline"
          >
            Forgot your password?
          </Link>
        </div>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="flex flex-row gap-10">
        <RadioGroup
          onValueChange={(value) => setRole(value)}
          defaultValue="candidate"
          className="flex flex-row gap-4"
        >
          <div className="flex justify-between items-center gap-2">
            <RadioGroupItem value="candidate" />
            <Label htmlFor="role">Candidate</Label>
          </div>
          <div className="flex justify-between items-center gap-2">
            <RadioGroupItem value="recruiter" />
            <Label htmlFor="role">Recruiter</Label>
          </div>
        </RadioGroup>
      </div>
      <Button
        type="submit"
        variant={"default"}
        className="w-full"
        onClick={async (e: any) => {
          e.preventDefault();
          await signIn("credentials", {
            username: email,
            password: password,
            role: role,
          });
        }}
      >
        Login
      </Button>
    </div>
  );
}
