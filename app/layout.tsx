import { Suspense, type ReactNode } from "react";
import QueryProvider from "@/app/_components/QueryProvider";
import Header from "@/app/_components/Header";
import { METADATA } from "@/app/_lib/constants";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "@/app/globals.css";

export const metadata = {
  ...METADATA,
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
        <QueryProvider>
          <Suspense>
            <Header />
          </Suspense>
          {children}
          <Analytics />
          <SpeedInsights />
        </QueryProvider>
      </body>
    </html>
  );
}
