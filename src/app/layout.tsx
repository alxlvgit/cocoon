import React from "react";
import Sidebar from "@/components/Sidebar";
import MobileNavbar from "@/components/MobileNavbar";
import Footer from "@/components/Footer"; 
import "./globals.css";
import type { Metadata } from "next";
import { twMerge } from "tailwind-merge";
import { Roboto } from "next/font/google";
import { ReduxProvider } from "@/redux/provider";
import Bucket from "@/components/Bucket";

const inter = Roboto({ weight: "400", subsets: ["latin-ext"] });

// Updated RootLayout component
// Updated RootLayout component
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark:bg-black dark:text-white">
      <ReduxProvider>
        <div className="flex flex-col min-h-screen">
          <header>
            {/* Your header content here */}
          </header>
          <main className="flex flex-col sm:flex-row flex-grow">
            <div className="sm:hidden">
              <MobileNavbar /> {/* Keep the MobileNavbar component */}
            </div>
            <aside className="hidden sm:flex">
              <Sidebar /> {/* Place the Sidebar component */}
            </aside>
            <div className="flex-grow p-4">{children}</div> {/* Adjust main content area */}
          </main>
          <Footer  />
        </div>
      </ReduxProvider>
    </html>
  );
}


