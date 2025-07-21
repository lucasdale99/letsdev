import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export function SocialIcons() {
  return (
    <div className="flex gap-4">
      <Link
        href="https://github.com/lucasdale99"
        target="_blank"
        aria-label="GitHub"
        rel="noopener noreferrer"
        className="hover:ring-gold hover:shadow-gold transition-all duration-300 ease-in-out p-2 rounded-full ring-2 group"
      >
        <GitHubLogoIcon className="h-5 w-5 transition-colors duration-300 group-hover:text-gold" />
      </Link>

      <Link
        href="https://www.linkedin.com/in/lucas-dale/"
        target="_blank"
        aria-label="LinkedIn"
        rel="noopener noreferrer"
        className="hover:ring-gold hover:shadow-gold transition-all duration-300 ease-in-out p-2 rounded-full ring-2 group"
      >
        <LinkedInLogoIcon className="h-5 w-5 transition-colors duration-300 group-hover:text-gold" />
      </Link>

      <Link
        href="https://x.com/lucas___dale"
        target="_blank"
        aria-label="X"
        rel="noopener noreferrer"
        className="hover:ring-gold hover:shadow-gold transition-all duration-300 ease-in-out p-2 rounded-full ring-2 group"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          className="transition-colors duration-300 group-hover:text-gold fill-current"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </Link>
    </div>
  );
}
