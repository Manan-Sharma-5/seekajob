import Image from "next/image";
import Link from "next/link";
import Form from "./Form";

export default function Login() {
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Sign Up</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to Signup to your account
            </p>
          </div>
          <Form />
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="#" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="/login.avif"
          alt="Image"
          width={1420}
          height={1000}
          className=" object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
