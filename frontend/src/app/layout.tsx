import React from "react";
import type { Metadata } from "next";
import { Lora, Playfair_Display } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

/* Provide a minimal JSX namespace fallback if @types/react is not available */
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

const lora = Lora({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "BESS — Northeastern University NSBE Chapter",
  description:
    "The official website of BESS, the Northeastern University chapter of the National Society of Black Engineers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <NavBar />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}