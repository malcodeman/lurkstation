import { Popover, Transition } from "@headlessui/react";
import { type ForwardedRef, forwardRef, Fragment } from "react";

type Props = React.HTMLAttributes<HTMLDivElement>;

export const PopoverPanel = forwardRef(
  (props: Props, ref: ForwardedRef<HTMLDivElement>) => {
    const { className, children, ...rest } = props;
    return (
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel
          ref={ref}
          className="absolute left-1/2 z-10 mt-1 w-full -translate-x-1/2 rounded bg-white text-sm dark:bg-[#29303d]"
          {...rest}
        >
          {children}
        </Popover.Panel>
      </Transition>
    );
  }
);

PopoverPanel.displayName = "PopoverPanel";
