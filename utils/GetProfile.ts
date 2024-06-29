import axios from "axios";

export async function getProfile() {
  const response = await axios.get("/api/profile");
  return response.data;
}
