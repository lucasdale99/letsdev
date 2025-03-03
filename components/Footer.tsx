import Link from "next/link";
import { SocialIcons } from "./SocialIcons";
import Image from "next/image";
import logo from "@/public/favicon-16x16.png";

export default function Footer() {
  return (
    <footer className="w-full backdrop-blur-sm bg-background/75 py-4">
      <div className="container mx-auto px-5">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col items-center md:items-start">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Let's Dev
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <div className="flex space-x-4 text-sm">
              <Link
                href="/blog"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Blog
              </Link>
              <Link
                href="https://strukt.io"
                className="text-muted-foreground hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Strukt
              </Link>

              <Link
                href="/experience"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Experience
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
