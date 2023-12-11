import axios from "axios";
import { RegisterUserForm } from "../register/form";

export const registerUser = (data: RegisterUserForm) => {
  return axios.post("/api/auth/register", data);
};
