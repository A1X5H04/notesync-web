import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createResponse<T>(status: boolean, message: string, data?: T) {
  return { status, message, data };
}
