import Link from "next/link";
import Image from "next/image";
import logo from "@/public/favicon-16x16.png";
import { SocialIcons } from "./SocialIcons";

export default function Header() {
  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-sm bg-background/75">
      <div className="w-full flex justify-end items-center h-16 p-5 gap-8">
        <ol className="w-full flex items-center justify-between">
          <li>
            <Link className="flex items-center gap-4" href="/">
              <Image src={logo} alt="Let&apos;s Dev Logo" />
              Let&apos;s Dev
            </Link>
          </li>
          <li className="flex items-center gap-4">
            <SocialIcons />
          </li>
        </ol>
      </div>
    </nav>
  );
}
