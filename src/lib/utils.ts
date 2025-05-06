import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge"; // Use `import` instead of `require`

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
