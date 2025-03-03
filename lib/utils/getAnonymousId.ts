// utils/anonymousId.ts
import { v4 as uuidv4 } from "uuid";

export function getAnonymousId(): string {
  // Check if we're in a browser environment
  if (typeof window === "undefined") {
    // Server-side rendering - return a temporary ID
    // This will be replaced with the real one on the client
    return uuidv4();
  }

  // Browser environment - proceed with localStorage
  let anonymousId = window.localStorage.getItem("anonymous_id");

  // If not, generate a new one and store it
  if (!anonymousId) {
    anonymousId = uuidv4();
    window.localStorage.setItem("anonymous_id", anonymousId);
  }

  return anonymousId;
}
