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
      <body className="bg-[#0D0D0D] text-black/80">
        <QueryProvider>
          <Header />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
