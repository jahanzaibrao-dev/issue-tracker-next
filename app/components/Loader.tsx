import React from "react";

const Loader = () => {
  return (
    <div className="fixed flex items-center justify-center h-full w-full bg-white opacity-50 z-50">
      <div className="relative">
        <div className="h-24 w-24 rounded-full border-t-4 border-b-4 border-gray-200"></div>
        <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-4 border-b-4 border-purple-500 animate-spin"></div>
      </div>
    </div>
  );
};

export default Loader;
