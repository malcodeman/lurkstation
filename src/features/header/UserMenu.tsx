import {
  Button,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tag,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import {
  FiChevronDown,
  FiUser,
  FiSun,
  FiMoon,
  FiWifi,
  FiWifiOff,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import { equals } from "ramda";
import { useLocalStorageValue } from "@react-hookz/web";

function UserMenu() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [dataSaver, setDataSaver] = useLocalStorageValue("dataSaver", false);
  const [matureContent, setMatureContent] = useLocalStorageValue(
    "matureContent",
    false
  );
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
        <MenuItem
          onClick={() => setDataSaver(!dataSaver)}
          icon={equals(dataSaver, true) ? <FiWifi /> : <FiWifiOff />}
        >
          {equals(dataSaver, true) ? (
            <Flex>
              <Text mr="2">Data saver</Text>
              <Tag colorScheme="green" size="sm">
                ON
              </Tag>
            </Flex>
          ) : (
            <Flex>
              <Text mr="2">Data saver</Text>
              <Tag colorScheme="red" size="sm">
                OFF
              </Tag>
            </Flex>
          )}
        </MenuItem>
        <MenuItem
          onClick={() => setMatureContent(!matureContent)}
          icon={equals(matureContent, true) ? <FiEye /> : <FiEyeOff />}
        >
          {equals(matureContent, true) ? (
            <Flex>
              <Text mr="2">Mature content</Text>
              <Tag colorScheme="green" size="sm">
                ON
              </Tag>
            </Flex>
          ) : (
            <Flex>
              <Text mr="2">Mature content</Text>
              <Tag colorScheme="red" size="sm">
                OFF
              </Tag>
            </Flex>
          )}
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

export default UserMenu;
