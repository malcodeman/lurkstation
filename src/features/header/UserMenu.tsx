import {
  Button,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorMode,
} from "@chakra-ui/react";
import { FiChevronDown, FiUser, FiSun, FiMoon } from "react-icons/fi";
import { equals } from "ramda";

function UserMenu() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Menu closeOnSelect={false}>
      <MenuButton as={Button} rightIcon={<FiChevronDown />} size="sm">
        <Icon as={FiUser} />
      </MenuButton>
      <MenuList>
        <MenuItem
          onClick={toggleColorMode}
          icon={equals(colorMode, "dark") ? <FiMoon /> : <FiSun />}
        >
          {equals(colorMode, "dark") ? "Dark mode" : "Light mode"}
        </MenuItem>
        <MenuItem>Data saver</MenuItem>
      </MenuList>
    </Menu>
  );
}

export default UserMenu;
