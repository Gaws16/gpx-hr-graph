import { filterExtensionFromName } from "@/lib/utils";
import { useMemo } from "react";

export default function CustomTooltip({ active, payload, label }: any) {
  // Group payload by dataKey/fileName
  const groupedPayload = useMemo(() => {
    if (!active || !payload || payload.length === 0) return null;

    const data: { [key: string]: { hr: number; distance: number } } = {};

    payload.forEach((entry: any) => {
      const fileName = filterExtensionFromName(entry.dataKey);
      data[fileName] = {
        hr: entry.value,
        distance: entry.payload.distance,
      };
    });

    return data;
  }, [active, payload]);

  if (!groupedPayload) return null;
  return (
    <div className="bg-white p-4 border border-gray-200 rounded-lg ">
      <p className="text-lg font-bold">{label}</p>
      <ul className=" list-inside border-t ">
        {Object.entries(groupedPayload).map(([fileName, data]) => (
          <div key={`item-${fileName}`} className="border-t pt-2">
            <p className="font-semibold">Activity: {fileName}</p>
            <li>
              <span className="font-bold">Heart Rate :</span> {data.hr}
            </li>
            <li>
              <span className="font-bold">Distance :</span> {data.distance} Km
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
}

return null;
