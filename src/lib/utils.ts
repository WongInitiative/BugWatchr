import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const categoryMap = new Map([
  ["backend", { value: "Backend", color: "green" }],
  ["frontend", { value: "Frontend", color: "indigo" }],
]);

export const priorityMap = new Map([
  ["low", { value: "Low", color: "teal" }],
  ["medium", { value: "Medium", color: "indigo" }],
  ["high", { value: "High", color: "tomato" }],
  ["critical", { value: "Critical", color: "red" }],
]);

export const statusMap = new Map([
  ["closed", { value: "Closed", color: "ruby" }],
  ["in_progress", { value: "In Progress", color: "sky" }],
  ["open", { value: "Open", color: "teal" }],
]);

export const roleMap = new Map([
  ["Developer", "green"],
  ["Project Manager", "indigo"],
]);

export type badgeColor =
  | "tomato"
  | "red"
  | "ruby"
  | "crimson"
  | "pink"
  | "plum"
  | "purple"
  | "violet"
  | "iris"
  | "indigo"
  | "blue"
  | "cyan"
  | "teal"
  | "jade"
  | "green"
  | "grass"
  | "brown"
  | "orange"
  | "sky"
  | "mint"
  | "lime"
  | "yellow"
  | "amber"
  | "gold"
  | "bronze"
  | "gray";
