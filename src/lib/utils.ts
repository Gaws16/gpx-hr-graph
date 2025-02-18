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
