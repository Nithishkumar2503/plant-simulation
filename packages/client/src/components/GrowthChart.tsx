import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import type { SimulationStep } from "../store/simulation.store";

interface GrowthChartProps {
  data: SimulationStep[];
}

export const GrowthChart: React.FC<GrowthChartProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="card flex items-center justify-center h-96">
        <p className="text-gray-400 text-center">
          Run a simulation to see growth visualization
        </p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2 className="text-2xl font-bold text-plant-700 mb-4">
        Plant Growth Over Time
      </h2>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />

          <XAxis
            dataKey="day"
            stroke="#666"
            label={{
              value: "Days",
              position: "insideBottomRight",
              offset: -5,
            }}
          />

          <YAxis
            stroke="#666"
            label={{
              value: "Level (0-100)",
              angle: -90,
              position: "insideLeft",
            }}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #ccc",
              borderRadius: "8px",
            }}
            formatter={(value) =>
              typeof value === "number" ? value.toFixed(1) : value
            }
          />

          <Legend />

          <Line
            type="monotone"
            dataKey="growth"
            stroke="#22c55e"
            strokeWidth={2}
            dot={false}
            name="Growth Level"
            isAnimationActive
          />

          <Line
            type="monotone"
            dataKey="stressLevel"
            stroke="#ef4444"
            strokeWidth={2}
            dot={false}
            name="Stress Level"
            isAnimationActive
          />

          <Line
            type="monotone"
            dataKey="diseaseLevel"
            stroke="#a855f7"
            strokeWidth={2}
            dot={false}
            name="Disease Level"
            isAnimationActive
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
