import "@/app/globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";

const inter = Roboto({ weight: "400", subsets: ["latin-ext"] });

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
      <body className={`${inter.className} w-full h-full`}>{children}</body>
    </html>
  );
}
