import { haversine } from "./utils";

export async function parseGPX(file: File) {
  const text = await file.text();
  const parser = new DOMParser();
  const xml = parser.parseFromString(text, "application/xml");

  const trkpts = Array.from(xml.getElementsByTagName("trkpt"));

  let totalDistance = 0;
  let prevLat: number | null = null;
  let prevLon: number | null = null;

  const data = trkpts.map((pt) => {
    const lat = parseFloat(pt.getAttribute("lat") || "0");
    const lon = parseFloat(pt.getAttribute("lon") || "0");
    const hr = pt.getElementsByTagName("gpxtpx:hr")[0]?.textContent || "0";
    const time = pt.getElementsByTagName("time")[0]?.textContent || "";

    // Compute distance from previous point
    if (prevLat !== null && prevLon !== null) {
      totalDistance += haversine(prevLat, prevLon, lat, lon);
    }

    prevLat = lat;
    prevLon = lon;

    return {
      distance: totalDistance,
      hr: parseInt(hr),
      fileName: file.name,
      time,
    };
  });

  return {
    distance: data.map((d) => d.distance),
    hr: data.map((d) => d.hr),
    fileName: file.name,
    time: data.map((d) => d.time),
  };
}
