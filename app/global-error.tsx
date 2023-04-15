"use client";
import ErrorComponent from "@/app/components/Error";
import { type ErrorComponent as ErrorComponentType } from "@/types";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function GlobalError({ reset }: ErrorComponentType) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
        <ErrorComponent reset={reset} />
      </body>
    </html>
  );
}
