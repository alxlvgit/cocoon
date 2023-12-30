import React from "react";
import NavBar from "@/components/Navbar";
import MobileNavbar from "@/components/MobileNavbar";
import "@/app/globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { ReduxProvider } from "@/redux/provider";
import { Providers } from "@/app/providers";

const inter = Roboto({ weight: ["400", "500", "700"], subsets: ["latin-ext"] });

export const metadata: Metadata = {
  title: "Cocoon",
  description: "Cocoon is a career path recommendation system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="w-full h-full">
      <ReduxProvider>
        <body className={`${inter.className}`}>
          <Providers>
            <NavBar />
            <MobileNavbar />
            {children}
          </Providers>
        </body>
      </ReduxProvider>
    </html>
  );
}
