import Link from "next/link";
// import { ThemeToggle } from "./ThemeToggle";
import Image from "next/image";
import React from "react";
import logo from "@/public/favicon-16x16.png";
import { SocialIcons } from "./SocialIcons";

export default function Header() {
  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-sm bg-background/75">
      <div className="w-full flex justify-end items-center h-16 p-5 gap-8">
        <ol className="w-full flex items-center justify-between">
          <li>
            <Link className="flex items-center gap-4" href="/">
              <Image src={logo} alt="Let's Dev Logo"></Image>
              Let's Dev
            </Link>
          </li>
          <li className="flex items-center gap-4">
            <SocialIcons />
            {/* <ThemeToggle /> */}
          </li>
        </ol>
      </div>
    </nav>
  );
}
