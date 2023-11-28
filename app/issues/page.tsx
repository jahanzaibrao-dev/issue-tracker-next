import React from "react";
import { Button } from "@radix-ui/themes";

import Link from "next/link";

const IssuesPage = () => {
  return (
    <div>
      <Button size="3">
        <Link className="flex" href="/issues/new">
          New Issue
        </Link>
      </Button>
    </div>
  );
};

export default IssuesPage;
