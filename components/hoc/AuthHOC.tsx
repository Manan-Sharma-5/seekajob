"use client";

import { useAuthContext } from "@/context/Auth-Context-Provider";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";

const AuthHOC = (WrappedComponent: React.ComponentType) => {
  return function AuthenticatedComponent(props: any) {
    const { user } = useAuthContext();
    const session = user;
    const router = useRouter();

    useEffect(() => {
      console.log("user", user);
      if (!session) {
        redirect("/");
      }
    }, [user, session]);

    if (!user) {
      return null; // or a loading spinner
    }

    return <WrappedComponent {...props} />;
  };
};

export default AuthHOC;
