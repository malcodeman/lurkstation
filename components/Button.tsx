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
    const styles = `rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  hover:bg-gray-50 dark:bg-white/10 dark:text-white dark:ring-white/10 dark:hover:bg-white/20 ${className}`;

    switch (as) {
      case "link":
        return (
          <Link className={styles} href={href || ""}>
            {children}
          </Link>
        );
      default:
        return (
          <button ref={ref} className={styles} {...rest}>
            {children}
          </button>
        );
    }
  }
);

Button.displayName = "Button";
