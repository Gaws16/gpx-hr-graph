import { HRData } from "@/types/GraphTypes";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatTime = (startTime: Date, currentTime: string) => {
  const current = new Date(currentTime);
  const diffMs = current.getTime() - startTime.getTime(); // Difference in ms
  const minutes = Math.floor(diffMs / 60000);
  const hours = Math.floor(minutes / 60);
  const formattedTime = `${String(hours).padStart(2, "0")}:${String(
    minutes % 60
  ).padStart(2, "0")}`;
  return formattedTime;
};
/**
 * Haversine formula to calculate distance between two lat/lon points (km).
 */
export function haversine(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
export function filterExtensionFromName(name: string) {
  return name.replace(/\.[^/.]+$/, "");
}
/**
 *
 * @param data
 * @param step
 * @returns
 */
export const downsampleData = (data: HRData[][], step: number) => {
  return data.map((fileData) =>
    fileData.filter((_, index) => index % step === 0)
  );
};
/**
 * Format elapsed time in milliseconds to HH:MM:SS
 * @param ms
 * @returns
 */
export function formatElapsedTime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [hours, minutes, seconds]
    .map((v) => String(v).padStart(2, "0"))
    .join(":");
}
