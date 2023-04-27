import { type ForwardedRef, forwardRef } from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef(
  (props: Props, ref: ForwardedRef<HTMLInputElement>) => {
    const { className, ...rest } = props;
    return (
      <input
        ref={ref}
        className={`block w-full rounded-md border-0 px-2.5 py-1.5 text-sm text-gray-900 shadow-sm outline-none ring-1 ring-inset ring-gray-300 transition-shadow placeholder:text-gray-400 focus:ring-2 focus:ring-blue-600 dark:bg-white/10 dark:text-white dark:ring-white/10 ${className}`}
        {...rest}
      />
    );
  }
);

Input.displayName = "Input";
