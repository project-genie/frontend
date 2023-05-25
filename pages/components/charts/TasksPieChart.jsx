import React from "react";
import { Pie, PieChart, ResponsiveContainer } from "recharts";

const TasksPieChart = ({ data }) => {
  return (
    <div className="h-full py-10">
      <div className="flex justify-center items-center">
        <p className="font-bold text-secondary-800 text-sm uppercase">
          Open and Completed Tasks
        </p>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={300}>
          <Pie
            dataKey="value"
            startAngle={180}
            endAngle={0}
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TasksPieChart;
