"use client";

import { useState } from "react";
import FileUpload from "@/components/FileUpload";
import Graph from "@/components/Graph";
import { parseGPX } from "@/lib/gpxParser";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HRData {
  distance: number;
  hr: number;
  fileName: string;
}

export default function Upload() {
  const [graphData, setGraphData] = useState<HRData[][]>([]);
  const [xAxis, setXAxis] = useState<"Time" | "Distance">("Time");

  const handleFileUpload = async (files: FileList) => {
    const allData: HRData[][] = [];

    for (const file of Array.from(files)) {
      const { distance, hr, fileName, time } = await parseGPX(file);
      const formattedData = distance.map((d, i) => ({
        distance: parseFloat(d.toFixed(2)), // Round to 2 decimal places
        hr: hr[i],
        fileName: fileName,
        time: time[i],
      }));

      allData.push(formattedData);
    }

    setGraphData(allData);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-xl font-bold">Upload GPX Files</h1>
      <FileUpload onFileUpload={handleFileUpload} />
      <DropdownMenu>
        <DropdownMenuTrigger>Select X Axis</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Time</DropdownMenuItem>
          <DropdownMenuItem>Distance</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {graphData.length > 0 && <Graph data={graphData} />}
    </div>
  );
}
