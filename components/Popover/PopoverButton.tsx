import { Popover } from "@headlessui/react";
import { FiChevronDown } from "react-icons/fi";
import { type ForwardedRef, forwardRef } from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const PopoverButton = forwardRef(
  (props: Props, ref: ForwardedRef<HTMLButtonElement>) => {
    const { className, children, ...rest } = props;
    return (
      <Popover.Button
        ref={ref}
        className={`w-full rounded bg-white px-2 py-1 text-left text-sm text-gray-900 shadow-sm outline-none ring-1 ring-inset ring-gray-300 transition-shadow hover:bg-gray-50 focus:ring-2 focus:ring-blue-600 dark:bg-white/10 dark:text-white dark:ring-white/10 dark:hover:bg-white/20 ${className}`}
        {...rest}
      >
        <span className="block truncate">{children}</span>
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <FiChevronDown aria-hidden="true" />
        </span>
      </Popover.Button>
    );
  }
);

PopoverButton.displayName = "PopoverButton";
