import axios from "axios";
import { BaseServiceURL } from "./BaseURL";

export const SignUpService = async (
  email: string,
  password: string,
  name: string,
  isCandidate: boolean
) => {
  try {
    const response = await BaseServiceURL.post("/auth/signup", {
      email,
      password,
      name,
      is_candidate: isCandidate,
    });
    if (response.status === 200) {
      return response.data;
    }
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  } catch (error) {
    console.error("Error during sign up:", error);
    throw error;
  }
};

export const SignInService = async (
  email: string,
  password: string,
  is_candidate: boolean
) => {
  try {
    const response = await BaseServiceURL.post("/auth/login", {
      email,
      password,
      is_candidate,
    });
    if (response.status === 200) {
      return response.data;
    }
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  } catch (error) {
    console.error("Error during sign in:", error);
    throw error;
  }
};

export const GetUserDetailsService = async () => {
  try {
    const response = await BaseServiceURL.get(`/auth/user`);
    if (response.status === 200) {
      return response.data;
    }
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error;
  }
};

export const LogoutService = async () => {
  try {
    const response = await BaseServiceURL.post("/auth/logout");
    if (response.status === 200) {
      return response.data;
    }
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  } catch (error) {
    console.error("Error during logout:", error);
    throw error;
  }
};
