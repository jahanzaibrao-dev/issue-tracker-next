"use client";
import { Card } from "@radix-ui/themes";
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { IssueStats, chartBgColors, chartLabels } from "./utils";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const PieChart = ({ stats }: { stats: IssueStats }) => {
  const data = {
    labels: chartLabels,
    datasets: [
      {
        label: "Issues%",
        data: [stats.open, stats.resolved, stats.inProgress],
        backgroundColor: chartBgColors,
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    plugins: {
      datalabels: {
        formatter: (value: any, ctx: any) => {
          let sum = 0;
          let dataArr = ctx.chart.data.datasets[0].data;
          dataArr = dataArr.map((data: any) => (sum += data as number));
          let percentage = ((value * 100) / sum).toFixed(2) + "%";
          console.log("per: ", percentage);
          return percentage;
        },
        color: "#ffffff",
        font: {
          size: 16,
        },
      },
    },
  };

  // // const ctx = (document.getElementById("pie-chart") as any)?.getContext("2d");

  // const PieChart = new ChartJS("id", {
  //   type: "pie",
  //   data: data,
  //   options,
  // });

  return (
    <Card className="shadow-lg max-w-2xl hover:shadow-lg">
      <Pie className="max-w-2xl max-h-96" options={options} data={data} />
    </Card>
  );
};

export default PieChart;
