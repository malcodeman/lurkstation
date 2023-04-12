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
      <body className="bg-[#edefec] dark:bg-[#121013] text-[#0e0f0c] dark:text-[#f1f0f3]">
        <QueryProvider>
          <Header />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
