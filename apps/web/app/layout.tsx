import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Github } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0a0a0a",
};

export const metadata: Metadata = {
  title: "Kommits.me",
  description: "Commit messages for people who ship.",
  openGraph: {
    title: "Kommits.me",
    description: "Commit messages for people who ship.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kommits.me",
    description: "Commit messages for people who ship.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} h-screen w-screen overflow-hidden flex flex-col bg-background text-foreground`}>
        <div className="flex-1 flex flex-col relative">
          {children}
        </div>
        <footer className="w-full py-3 md:py-4 flex justify-center items-center shrink-0 z-50">
          <a
            href="https://github.com/leotrimhaliti/Kommits"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </a>
        </footer>
        <Toaster />
      </body>
    </html>
  );
}
