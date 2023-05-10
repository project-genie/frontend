import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const AllProjectsTasksChart = ({ data }) => {
  console.log("inside data: ", data);
  return (
    <div className="h-full">
      <div className="flex justify-center items-center">
        <p className="font-bold text-secondary-800 text-sm uppercase">
          Task Count by project
        </p>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="project" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="openTasks" stackId="a" fill="#8884d8" />
          <Bar dataKey="completedTasks" stackId="a" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AllProjectsTasksChart;
