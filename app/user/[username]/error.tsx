"use client";
import ErrorComponent from "@/app/components/Error";
import type { ErrorComponent as ErrorComponentType } from "@/types";

export default function Error({ reset }: ErrorComponentType) {
  return <ErrorComponent reset={reset} />;
}
