import { redirect } from "next/navigation";

import { auth } from "@/auth";

interface AuthWrapperProps {
  children: React.ReactNode;
}

export async function AuthWrapper({ children }: AuthWrapperProps) {
  const session = await auth();

  if (session?.user?.email !== process.env.AUTH_ALLOWED_EMAIL) {
    redirect("/login");
  }

  return <>{children}</>;
}
