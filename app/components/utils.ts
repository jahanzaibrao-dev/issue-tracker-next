import { signOut } from "next-auth/react";
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
  {
    label: "Logout",
    href: "",
    onClick: () => {
      signOut();
    },
  },
];

export const getBadgeColor = (status: string) => {
  return status === IssueStatus.In_Progress
    ? "orange"
    : status === IssueStatus.Resolved
    ? "green"
    : "blue";
};

export interface IssueStats {
  open: number;
  resolved: number;
  inProgress: number;
}

export const chartLabels = ["Open", "Resolved", "In_Progress"];

export const chartBgColors = ["#5FBDFF", "#9ADE7B", "#EC8F5E"];
