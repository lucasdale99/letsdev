export const isLocal = () => {
  return process.env.NEXT_PUBLIC_URL?.includes(":3000");
};
