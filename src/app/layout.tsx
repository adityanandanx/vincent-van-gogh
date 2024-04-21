import type { Metadata } from "next";
import { Inter as FontSans, Caveat as FontCursive } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ReactLenis } from "@/lib/react-lenis";

const fontSans = FontSans({ subsets: ["latin"], variable: "--font-sans" });
const fontCursive = FontCursive({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-cursive",
});

export const metadata: Metadata = {
  title: "Vincent van Gogh - Built by Aditya Nandan",
  description:
    "Explore the captivating world of Vincent van Gogh. Delve into his art, journey, and the emotions that fueled his brushstrokes. Built by Aditya Nandan",
  openGraph: {
    url: "https://vincent-van-gogh-ten.vercel.app/",
    title: "Vincent van Gogh - Built by Aditya Nandan",
    description:
      "Explore the captivating world of Vincent van Gogh. Delve into his art, journey, and the emotions that fueled his brushstrokes. Built by Aditya Nandan",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactLenis root>
      <html lang="en">
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased dark",
            fontSans.variable,
            fontCursive.variable
          )}
        >
          <main className="">{children}</main>
        </body>
      </html>
    </ReactLenis>
  );
}
