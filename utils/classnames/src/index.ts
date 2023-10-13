import type { ClassValue } from "clsx"
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 *
 * @param inputs Thank you Shad! https://ui.shadcn.com/docs/installation#add-a-cn-helper
 * @returns
 */
export default function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
