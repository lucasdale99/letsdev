import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Navbar from "../components/Navbar";
import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  title: "Let Us Dev",
  description: "A simple demonstration of my skill set.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  other: {
    "msapplication-TileColor": "#da532c",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={GeistSans.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="theme-mode"
        >
          <main className="min-h-screen min-w-screen flex flex-col">
            <Navbar />
            {children}
          </main>
          <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs"></footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
