import { IssueStatus } from "../api/issues/types";

export const navItems = [
  {
    label: "Issues",
    href: "/issues",
  },
  {
    label: "About",
    href: "/about",
  },
];

export const getBadgeColor = (status: string) => {
  return status === IssueStatus.In_Progress
    ? "orange"
    : status === IssueStatus.Resolved
    ? "green"
    : "blue";
};
