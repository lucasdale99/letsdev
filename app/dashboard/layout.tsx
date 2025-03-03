import { AuthWrapper } from "./components/AuthWrapper";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthWrapper>{children}</AuthWrapper>;
}
