import axios from "axios";
import { IssueForm } from "../issues/new/page";

export const createIssue = async (data: IssueForm) => {
  return axios.post("/api/issues", data);
};

export const deleteIssue = async (id: number) => {
  return axios.delete(`/api/issues/${id}`);
};

export const getAllIssues = async () => {
  return axios.get("/api/issues");
};
