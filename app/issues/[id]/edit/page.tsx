"use client";
import { IssueStatus, editIssuePayload } from "@/app/api/issues/types";
import EditIssueForm, { IssueEditForm } from "@/app/components/EditIssueForm";
import Loader from "@/app/components/Loader";
import { getSingleIssue, updateIssue } from "@/app/services/issue";
import { Card } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

interface EditIssueParams {
  id: string;
}

const EditIssuePage = ({ params }: { params: EditIssueParams }) => {
  const [issue, setIssue] = useState({
    description: "",
    title: "",
    status: IssueStatus.Open,
  });
  const [isLoading, setLoader] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getIssue();
  }, []);

  const setItemStatus = (status: IssueStatus) => {
    setIssue({ ...issue, status: status });
  };

  const getIssue = async () => {
    setLoader(true);
    try {
      const response = await getSingleIssue(params.id);

      if (response.data) {
        console.log(response.data);
        setIssue({
          title: response.data.title,
          description: response.data.description,
          status: response.data.status,
        });
      }
      setLoader(false);
    } catch (e) {
      setLoader(false);
    }
  };

  const submitEditedIssue = async (issue: IssueEditForm) => {
    setLoader(true);

    try {
      const response = await updateIssue(params.id, issue);

      if (response.data) {
        setLoader(false);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Issue Updated Successfully!",
          showConfirmButton: true,
          confirmButtonText: "Go to Issues",
          confirmButtonColor: "purple",
        }).then((result) => {
          router.push("/issues");
        });
      }
      setLoader(false);
    } catch (e) {
      setLoader(false);
    }
  };

  return (
    <div>
      {isLoading && <Loader />}
      <Card className="shadow-lg p-5 max-w-xl m-auto">
        <EditIssueForm
          setItemStatus={setItemStatus}
          item={issue}
          onSubmit={submitEditedIssue}
        />
      </Card>
    </div>
  );
};

export default EditIssuePage;
