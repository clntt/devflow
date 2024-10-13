import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTimeStamps = (date: string | Date): string => {
  const now = new Date();
  const pastDate = new Date(date);

  // Validate the date
  if (isNaN(pastDate.getTime())) {
    throw new Error("Invalid date");
  }

  const secondsAgo = Math.floor((now.getTime() - pastDate.getTime()) / 1000);

  const intervals: { label: string; seconds: number }[] = [
    { label: "year", seconds: 31536000 }, // 60 * 60 * 24 * 365
    { label: "month", seconds: 2592000 }, // 60 * 60 * 24 * 30
    { label: "week", seconds: 604800 }, // 60 * 60 * 24 * 7
    { label: "day", seconds: 86400 }, // 60 * 60 * 24
    { label: "hour", seconds: 3600 }, // 60 * 60
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];

  for (const { label, seconds } of intervals) {
    const count = Math.floor(secondsAgo / seconds);
    if (count > 0) {
      return `${count} ${label}${count > 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
};

export const formatBigNumber = (num: string | number): string => {
  // Convert the input to a number
  const value = typeof num === "string" ? parseFloat(num) : num;

  if (isNaN(value)) {
    // throw new Error("Invalid number");
    console.log("Invalid number");
  }

  if (value < 0) {
    return "-" + formatBigNumber(-value);
  }

  const units = [
    { suffix: " t", value: 1_000_000_000_000 }, // Trillion
    { suffix: " b", value: 1_000_000_000 }, // Billion
    { suffix: " m", value: 1_000_000 }, // Million
    { suffix: " k", value: 1_000 }, // Thousand
    { suffix: "", value: 1 }, // Unit
  ];

  for (const { suffix, value: unitValue } of units) {
    if (value >= unitValue) {
      // Format the number
      const formattedNumber = (value / unitValue)
        .toFixed(1)
        .replace(/\.0$/, "");
      return `${formattedNumber}${suffix}`;
    }
  }

  return "0"; // Fallback for zero
};

// export const formatBigNumber = (num: number): string | number => {
//   if (num < 0) {
//     return "-" + formatBigNumber(-num);
//   }

//   const units = [
//     { suffix: "t", value: 1_000_000_000_000 }, // Trillion
//     { suffix: "b", value: 1_000_000_000 }, // Billion
//     { suffix: "m", value: 1_000_000 }, // Million
//     { suffix: "k", value: 1_000 }, // Thousand
//     { suffix: "", value: 1 }, // Unit
//   ];

//   for (const { suffix, value } of units) {
//     if (num >= value) {
//       // Format the number
//       const formattedNumber = (num / value).toFixed(1).replace(/\.0$/, "");
//       return `${formattedNumber}${suffix}`;
//     }
//   }

//   return "0"; // Fallback for zero
// };

export function getMonthYear(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    year: "numeric",
  };
  return date?.toLocaleDateString("en-US", options);
}
