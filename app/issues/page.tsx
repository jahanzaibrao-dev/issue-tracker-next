"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@radix-ui/themes";

import Link from "next/link";
import axios from "axios";
import Loader from "../components/Loader";
import IssueCard from "../components/IssueCard";
import { deleteIssue, getAllIssues } from "../services/issue";

const IssuesPage = () => {
  const [issues, setIssues] = useState([]);
  const [isLoading, setLoader] = useState(false);

  useEffect(() => {
    getIssues();
  }, []);

  const getIssues = async () => {
    setLoader(true);
    try {
      const response = await getAllIssues();
      if (response.data) {
        setIssues(response.data);
      }
      setLoader(false);
    } catch (e) {
      setLoader(false);
    }
  };

  const delIssue = async (id: number) => {
    setLoader(true);
    try {
      const response = await deleteIssue(id);
      if (response.data) {
        getIssues();
      } else {
        setLoader(false);
      }
    } catch (e) {
      setLoader(false);
    }
  };

  return (
    <div className="space-y-10">
      {isLoading && <Loader />}
      <Button ml="auto" size="3">
        <Link className="flex" href="/issues/new">
          New Issue
        </Link>
      </Button>

      {issues.length > 0 && (
        <div className="space-y-10 w-full items-center">
          {issues.map((issue: any) => (
            <IssueCard item={issue} key={issue.id} onDeleteItem={delIssue} />
          ))}
        </div>
      )}
    </div>
  );
};

export default IssuesPage;
