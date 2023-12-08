import { Card } from "@radix-ui/themes";
import React from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { PolarArea } from "react-chartjs-2";
import { IssueStats, chartBgColors, chartLabels } from "./utils";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const PolarChart = ({ stats }: { stats: IssueStats }) => {
  const data = {
    labels: chartLabels,
    datasets: [
      {
        label: "No. of Issues",
        data: [stats.open, stats.resolved, stats.inProgress],
        backgroundColor: chartBgColors,
        borderWidth: 1,
      },
    ],
  };

  return (
    <Card className="shadow-lg max-w-2xl hover:shadow-lg">
      <PolarArea className="max-w-2xl max-h-96" data={data} />
    </Card>
  );
};

export default PolarChart;
