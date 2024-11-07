// "use client";
// import * as React from "react";
// import { useTheme } from "next-themes";
// import { Button } from "./ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "../components/ui/dropdown-menu";
// import { Moon, Sun } from "lucide-react";

// export function ThemeToggle() {
//   const { theme, setTheme } = useTheme();

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button
//           variant="override"
//           onClick={() => setTheme(theme === "light" ? "dark" : "light")}
//           className="hover:ring-gold hover:shadow-gold transition-all duration-300 ease-in-out p-2 rounded-full ring-2 group h-9 w-9 flex items-center justify-center"
//         >
//           <Sun className="h-5 w-5 transition-colors duration-300 group-hover:text-gold rotate-0 scale-100 dark:-rotate-90 dark:scale-0" />
//           <Moon className="absolute h-5 w-5 transition-colors duration-300 group-hover:text-gold rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
//           <span className="sr-only">Toggle theme</span>
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent align="end">
//         <DropdownMenuItem onClick={() => setTheme("light")}>
//           Light
//         </DropdownMenuItem>
//         <DropdownMenuItem onClick={() => setTheme("dark")}>
//           Dark
//         </DropdownMenuItem>
//         <DropdownMenuItem onClick={() => setTheme("system")}>
//           System
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }
