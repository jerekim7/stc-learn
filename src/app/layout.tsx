import type { Metadata } from "next";
import { Montserrat, Plus_Jakarta_Sans, Inter, Lexend } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-brand",
  display: "swap"
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap"
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap"
});

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-number",
  display: "swap"
});

export const metadata: Metadata = {
  title: "STC Learn",
  description: "Internal weekly learning platform for STC-Chama"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${plusJakartaSans.variable} ${inter.variable} ${lexend.variable}`}
    >
      <body className="font-body antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}