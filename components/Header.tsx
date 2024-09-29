import { ThemeToggle } from "./ThemeToggle";

export default function Header() {
  return (
    <nav className="w-full flex justify-end items-center border-b border-b-foreground/10 h-16 p-5">
      <ThemeToggle />
    </nav>
  );
}
