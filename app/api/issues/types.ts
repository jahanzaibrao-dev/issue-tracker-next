export interface createIssuePayload {
  title: string;
  description: string;
}

export enum IssueStatus {
  Open = "Open",
  In_Progress = "In_Progress",
  Resolved = "Resolved",
}

export interface editIssuePayload extends createIssuePayload {
  status: IssueStatus;
}
