import Link from "next/link";
import React from "react";

const Users = () => {
  return (
    <div style={{ padding: "10px" }}>
      <h1>Users Page</h1>
      <Link style={{ color: "blue", marginTop: "10px" }} href={"/"}>
        Go Back
      </Link>
    </div>
  );
};

export default Users;
