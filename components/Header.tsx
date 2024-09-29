import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export default function Header() {
  return (
    <nav className="w-full flex justify-end items-center border-b border-b-foreground/10 h-16 p-5 gap-8">
      <ol className="w-full flex justify-between">
        <li>
          <Link href="/">Let's Dev</Link>
        </li>
        <li>
          <Link href="/blog">Blog</Link>
        </li>
      </ol>
      <ThemeToggle />
    </nav>
  );
}
