import type { ReactNode } from "react";
import "./globals.css";

import QueryProvider from "./components/QueryProvider";

export const metadata = {
  title: "lurkstation",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
