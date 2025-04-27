"use client";

import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { SignInService, SignUpService } from "@/services/AuthServices";

interface User {
  email: string;
  name: string;
  is_candidate: boolean;
}

interface AuthContextType {
  user: User | null | undefined;
  setUser: (user: any) => void;
  token: string | null;
  setToken: (token: string | null) => void;
  login: (
    email: string,
    password: string,
    is_candidate: boolean
  ) => Promise<void>;
  register: (
    email: string,
    password: string,
    name: string,
    isCandidate: boolean
  ) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  login: async () => {},
  token: null,
  setToken: () => {},
  register: async () => {},
  signOut: () => {},
});

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    if (storedToken) {
      setToken(storedToken);
    }
  }, [router]);

  const login = async (
    email: string,
    password: string,
    is_candidate: boolean
  ) => {
    await SignInService(email, password, is_candidate).then((res) => {
      console.log("User in AuthContext:", res);
      setUser({
        email: email,
        name: res.user.name,
        is_candidate: res.user.is_candidate,
      });
      localStorage.setItem("user", JSON.stringify(res.user));
      setToken(res.email);
      localStorage.setItem("token", res.token);
      toast.success("Login successful");
      router.push("/jobs");
    });
  };

  const register = async (
    email: string,
    password: string,
    name: string,
    isCandidate: boolean
  ) => {
    await SignUpService(email, password, name, isCandidate).then((res) => {
      setUser({
        email: email,
        name: name,
        is_candidate: res.is_candidate,
      });
      setToken(res.email);
      toast.error("Invalid credentials: " + res.data.error);
    });
  };

  const signOut = async () => {
    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        register,
        token,
        setToken,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
