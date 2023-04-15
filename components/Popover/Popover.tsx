import { Popover as HeadlessPopover } from "@headlessui/react";
import { type ForwardedRef, forwardRef } from "react";

type Props = React.HTMLAttributes<HTMLDivElement>;

export const Popover = forwardRef(
  (props: Props, ref: ForwardedRef<HTMLDivElement>) => {
    const { className, children, ...rest } = props;
    return (
      <HeadlessPopover
        ref={ref}
        className="relative w-full max-w-[10rem]"
        {...rest}
      >
        {children}
      </HeadlessPopover>
    );
  }
);

Popover.displayName = "Popover";
