import { type Url } from "next/dist/shared/lib/router/router";
import { type ForwardedRef, forwardRef } from "react";
import Link from "next/link";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  as?: "link";
  href?: Url;
  "data-testid"?: string;
};

export const Button = forwardRef(
  (props: Props, ref: ForwardedRef<HTMLButtonElement>) => {
    const {
      as,
      href,
      children,
      className,
      "data-testid": testId,
      ...rest
    } = props;

    switch (as) {
      case "link":
        return (
          <Link
            className={`rounded bg-white px-2.5 py-1.5 text-sm text-gray-900 shadow-sm outline-none ring-1 ring-inset ring-gray-300 transition-shadow hover:bg-gray-50 focus:ring-2 focus:ring-blue-600 dark:bg-white/10 dark:text-white dark:ring-white/10 dark:hover:bg-white/20 ${className}`}
            href={href || ""}
            data-testid={testId}
          >
            {children}
          </Link>
        );
      default:
        return (
          <button
            ref={ref}
            className={`rounded bg-white px-2.5 py-1.5 text-sm text-gray-900 shadow-sm outline-none ring-1 ring-inset ring-gray-300 transition-shadow hover:bg-gray-50 focus:ring-2 focus:ring-blue-600 dark:bg-white/10 dark:text-white dark:ring-white/10 dark:hover:bg-white/20 ${className}`}
            data-testid={testId}
            {...rest}
          >
            {children}
          </button>
        );
    }
  },
);

Button.displayName = "Button";
