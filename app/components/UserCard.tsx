"use client";
import React from "react";

const UserCard = () => {
  return (
    <div>
      <button onClick={() => console.log("navigating to user")}>
        go to users
      </button>
    </div>
  );
};

export default UserCard;
