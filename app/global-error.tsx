"use client";
import ErrorComponent from "@/app/components/Error";
import type { ErrorComponent as ErrorComponentType } from "@/types";

export default function GlobalError({ reset }: ErrorComponentType) {
  return (
    <html>
      <body>
        <ErrorComponent reset={reset} />
      </body>
    </html>
  );
}
