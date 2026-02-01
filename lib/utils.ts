import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const calculateBMI = (weight: number, height: number): number => {
  return parseFloat((weight / (height / 100) ** 2).toFixed(2));
};

export const getHealthyWeightRange = (height: number) => {
  const min = (18.5 * (height / 100) ** 2).toFixed(1);
  const max = (24.9 * (height / 100) ** 2).toFixed(1);
  return { min, max };
};
