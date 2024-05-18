import {
  Menu as ArkMenu,
  MenuRootProps,
  MenuTriggerProps,
  MenuContentProps,
  MenuItemProps,
} from "@ark-ui/react";
import { FiChevronDown } from "react-icons/fi";

export const Menu = (props: MenuRootProps) => {
  return <ArkMenu.Root {...props} />;
};

export const MenuButton = (props: MenuTriggerProps) => {
  const { className, children, ...rest } = props;

  return (
    <ArkMenu.Trigger
      className={`relative rounded bg-white px-2.5 py-1.5 text-left text-sm text-gray-900 shadow-sm outline-none ring-1 ring-inset ring-gray-300 transition-shadow hover:bg-gray-50 focus:ring-2 focus:ring-blue-600 dark:bg-white/10 dark:text-white dark:ring-white/10 dark:hover:bg-white/20 ${className}`}
      {...rest}
    >
      {children}
      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
        <FiChevronDown aria-hidden="true" />
      </span>
    </ArkMenu.Trigger>
  );
};

export const MenuList = (props: MenuContentProps) => {
  const { children, ...rest } = props;

  return (
    <ArkMenu.Positioner className="w-full max-w-[10rem]">
      <ArkMenu.Content
        className="rounded bg-white text-sm outline-none dark:bg-[#29303d]"
        {...rest}
      >
        {children}
      </ArkMenu.Content>
    </ArkMenu.Positioner>
  );
};

export const MenuItem = (props: MenuItemProps) => {
  return <ArkMenu.Item {...props} />;
};
