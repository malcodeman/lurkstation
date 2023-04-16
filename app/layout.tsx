import type { ReactNode } from "react";
import QueryProvider from "@/app/components/QueryProvider";
import Header from "@/app/components/Header";
import { METADATA } from "@/app/lib/constants";
import { Inter } from "next/font/google";
import "./globals.css";

import Fathom from "./components/Fathom";

export const metadata = {
  ...METADATA,
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
        <Fathom />
        <QueryProvider>
          <Header />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
