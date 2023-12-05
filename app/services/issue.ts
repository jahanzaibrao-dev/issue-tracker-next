import axios from "axios";
import { IssueForm } from "../issues/new/page";
import { IssueEditForm } from "../components/EditIssueForm";

export const createIssue = async (data: IssueForm) => {
  return axios.post("/api/issues", data);
};

export const deleteIssue = async (id: number) => {
  return axios.delete(`/api/issues/${id}`);
};

export const getAllIssues = async () => {
  return axios.get("/api/issues");
};

export const getSingleIssue = async (id: string) => {
  return axios.get(`/api/issues/${id}`);
};

export const updateIssue = async (id: string, data: IssueEditForm) => {
  return axios.put(`/api/issues/${id}`, data);
};

export const getIssueStats = async () => {
  return axios.get(`/api/issues/stats`);
};
