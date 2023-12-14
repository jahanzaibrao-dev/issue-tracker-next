import axios from "axios";

export const getChatThread = async () => {
  return axios.get("/api/askGpt");
};
