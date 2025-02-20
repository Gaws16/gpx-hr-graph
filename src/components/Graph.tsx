"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useMemo } from "react";
import CustomTooltip from "./CustomTooltip";
import { HRData } from "@/types/GraphTypes";
import { downsampleData } from "@/lib/utils";

const colors = ["#8884d8", "#82ca9d", "#ff7300", "#ff6384", "#36a2eb"];

const Graph = ({ data }: { data: HRData[][] }) => {
  // Merge data from all files into a single array
  const mergedData = useMemo(() => {
    const allDistances = new Set<number>();
    const downsmapledData = downsampleData(data, 10);
    downsmapledData.forEach((fileData) =>
      fileData.forEach((point) => allDistances.add(point.distance))
    );

    const sortedDistances = Array.from(allDistances).sort((a, b) => a - b);

    return sortedDistances.map((distance) => {
      const entry: { distance: number; [key: string]: number | string } = {
        distance,
      };
      data.forEach((fileData) => {
        const point = fileData.find((p) => p.distance === distance);
        if (point) {
          entry[point.fileName] = point.hr;
        }
      });
      return entry;
    });
  }, [data]);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={mergedData}>
        <XAxis
          dataKey="distance"
          label={{
            value: "Distance (km)",
            position: "insideBottom",
            offset: -5,
          }}
        />
        <YAxis
          label={{
            value: "Heart Rate (bpm)",
            angle: -90,
            position: "insideLeft",
          }}
        />

        <Tooltip
          content={<CustomTooltip />}
          wrapperStyle={{ transition: "opacity 0.1s ease-in-out" }}
        />

        <Legend
          verticalAlign="top"
          align="right"
          wrapperStyle={{ marginBottom: 10 }}
        />
        {data.map((fileData, index) => (
          <Line
            key={fileData[0]?.fileName || `File ${index + 1}`}
            type="monotone"
            dataKey={fileData[0]?.fileName || `File ${index + 1}`}
            stroke={colors[index % colors.length]}
            strokeWidth={2}
            connectNulls
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Graph;
