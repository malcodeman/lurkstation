import { type Url } from "next/dist/shared/lib/router/router";
import { type ForwardedRef, forwardRef } from "react";
import Link from "next/link";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  as?: "link";
  href?: Url;
};

export const Button = forwardRef(
  (props: Props, ref: ForwardedRef<HTMLButtonElement>) => {
    const { as, href, children, className, ...rest } = props;

    switch (as) {
      case "link":
        return (
          <Link
            className={`rounded bg-white px-2 py-1 text-sm text-gray-900 shadow-sm outline-none ring-1 ring-inset ring-gray-300 transition-shadow hover:bg-gray-50 focus:ring-2 focus:ring-blue-600 dark:bg-white/10 dark:text-white dark:ring-white/10 dark:hover:bg-white/20 ${className}`}
            href={href || ""}
          >
            {children}
          </Link>
        );
      default:
        return (
          <button
            ref={ref}
            className={`rounded bg-white px-2 py-1 text-sm text-gray-900 shadow-sm outline-none ring-1 ring-inset ring-gray-300 transition-shadow hover:bg-gray-50 focus:ring-2 focus:ring-blue-600 dark:bg-white/10 dark:text-white dark:ring-white/10 dark:hover:bg-white/20 ${className}`}
            {...rest}
          >
            {children}
          </button>
        );
    }
  }
);

Button.displayName = "Button";
