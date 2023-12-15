"use client";
import PieChart from "./components/PieChart";
import { useEffect, useState } from "react";
import { getIssueStats } from "./services/issue";
import Loader from "./components/Loader";
import { Flex } from "@radix-ui/themes";
import PolarChart from "./components/PolarChart";
import { IssueStats } from "./components/utils";

export default function Home() {
  const [isLoading, setLoader] = useState(false);
  const [stats, setStats] = useState<IssueStats>({
    open: 0,
    resolved: 0,
    inProgress: 0,
  });

  useEffect(() => {
    getStats();
  }, []);

  const getStats = async () => {
    setLoader(true);
    try {
      const response = await getIssueStats();
      if (response.data) setStats(response.data);
      setLoader(false);
    } catch (e) {
      setLoader(false);
    }
  };
  return (
    <div className="p-5 space-y-5 mt-14">
      {isLoading && <Loader />}
      <PieChart stats={stats} />
      <PolarChart stats={stats} />
    </div>
  );
}
