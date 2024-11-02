export function capitalizeAndRemoveDashes(str: string) {
  console.log(str, "STRING");
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
