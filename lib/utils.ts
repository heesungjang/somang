import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isUrlValid = (url: string): boolean => {
  try {
    // Prepend https:// if no protocol is specified
    let urlToValidate = url;
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      urlToValidate = `https://${url}`;
    }

    const parsedUrl = new URL(urlToValidate);

    // Check hostname has at least one dot and valid domain format
    if (
      !parsedUrl.hostname.includes(".") ||
      !/^[a-zA-Z0-9][-a-zA-Z0-9.]+[a-zA-Z0-9]$/.test(parsedUrl.hostname)
    ) {
      return false;
    }
    return true;
  } catch (e) {
    return false;
  }
};

export const formatUrl = (url: string): string => {
  try {
    //1  if not protocol, add https://
    let urlToValidate = url;
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      urlToValidate = `https://${url}`;
    }

    const parsedUrl = new URL(urlToValidate);
    return parsedUrl.toString();
  } catch (e) {
    return "";
  }
};
