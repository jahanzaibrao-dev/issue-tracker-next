import axios from "axios";
import { RegisterUserForm } from "../register/form";

export const registerUser = (data: RegisterUserForm) => {
  return axios.post("/api/auth/register", data);
};

export const askChatGPT = async (userMessage: string) => {
  const response = await axios.post("/api/assistant", { message: userMessage });
  return response;
};
