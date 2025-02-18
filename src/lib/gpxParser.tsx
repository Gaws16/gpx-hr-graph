import { XMLParser } from "fast-xml-parser";

export const parseGPX = async (
  file: File
): Promise<{ time: string[]; hr: number[] }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (!event.target?.result) return reject("Error reading file");
      const parser = new XMLParser({ ignoreAttributes: false });
      const gpxData = parser.parse(event.target.result as string);

      // Navigate GPX structure to find HR data
      const trackPoints = gpxData?.gpx?.trk?.trkseg?.trkpt;
      if (!trackPoints) return reject("Invalid GPX structure");

      const time: string[] = [];
      const hr: number[] = [];

      trackPoints.forEach((point: any) => {
        if (
          point.time &&
          point.extensions?.["gpxtpx:TrackPointExtension"]?.["gpxtpx:hr"]
        ) {
          time.push(point.time);
          hr.push(
            parseInt(
              point.extensions["gpxtpx:TrackPointExtension"]["gpxtpx:hr"],
              10
            )
          );
        }
      });

      resolve({ time, hr });
    };
    reader.onerror = () => reject("Error reading file");
    reader.readAsText(file);
  });
};
