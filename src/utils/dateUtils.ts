import { format, parse } from "date-fns";

export function formatSessionDuration(durationInSeconds: number): string {
  const totalSeconds = Math.floor(durationInSeconds);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');
  return `${formattedMinutes}:${formattedSeconds}`;
}

export function formatDate(date: string): string {
  return format(parse(date, "yyyyMMdd", new Date()), "dd/MM/yyyy");
}

export function formatDateHours(date: string): string {
  return format(parse(date, "yyyyMMddHH", new Date()), "dd/MM/yyyy HH:mm");
}
