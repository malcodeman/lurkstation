import type { ReactNode } from "react";
import QueryProvider from "@/app/components/QueryProvider";
import Header from "@/app/components/Header";
import "./globals.css";

export const metadata = {
  title: "lurkstation",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
        <QueryProvider>
          <Header />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
