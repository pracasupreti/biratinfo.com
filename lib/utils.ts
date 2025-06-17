import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// lib/utils.ts
export const extractLinksFromHtml = (html: string): string[] => {
  // Early return for server-side or if html is empty/nullish
  if (typeof window === 'undefined' || !html) {
    console.log("HTML", html)
    return [];
  }

  try {

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    const links = Array.from(doc.querySelectorAll('a[href]'))
      // 1. Get the href attribute from each anchor tag.
      .map(anchor => anchor.getAttribute('href'))
      // 2. Filter out any null, undefined, or empty strings.
      //    This is the corrected, less strict filter.
      .filter((href): href is string => !!href);

    // Using a Set removes any duplicate links before returning
    return Array.from(new Set(links));

  } catch (error) {
    console.error('Error parsing HTML to extract links:', error);
    return [];
  }
};
