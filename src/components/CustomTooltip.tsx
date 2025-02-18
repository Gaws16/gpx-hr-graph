export default function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-gray-200 rounded-lg">
        <p className="text-lg font-bold">{label}</p>
        <ul className=" list-inside">
          {payload.map(
            (entry: any) => (
              console.log(entry),
              (
                <div key={`item-${entry.dataKey}`}>
                  <li>
                    <span className="font-bold">Heart Rate :</span>{" "}
                    {entry.value}
                  </li>
                  <li>
                    <span className="font-bold">Distance :</span>{" "}
                    {entry.payload.distance} Km
                  </li>
                </div>
              )
            )
          )}
        </ul>
      </div>
    );
  }

  return null;
}
