"use client";

import { useState } from "react";
import FileUpload from "@/components/FileUpload";
import Graph from "@/components/Graph";
import { parseGPX } from "@/lib/gpxParser";

export default function UploadPage() {
  const [graphData, setGraphData] = useState<{ time: string; hr: number }[]>(
    []
  );

  const handleFileUpload = async (files: FileList) => {
    let allData: { time: string; hr: number }[] = [];

    for (const file of Array.from(files)) {
      const { time, hr } = await parseGPX(file);
      const formattedData = time.map((t, i) => ({ time: t, hr: hr[i] }));
      allData = [...allData, ...formattedData];
    }

    setGraphData(allData);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-xl font-bold">Upload GPX Files</h1>
      <FileUpload onFileUpload={handleFileUpload} />
      {graphData.length > 0 && <Graph data={graphData} />}
    </div>
  );
}
