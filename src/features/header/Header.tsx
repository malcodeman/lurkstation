import {
  Box,
  Button,
  Flex,
  Icon,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiLayers, FiChevronDown, FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";

function Header() {
  const backgroundColor = useColorModeValue("white", "gray.800");
  return (
    <Box
      backgroundColor={backgroundColor}
      as="header"
      paddingY="2"
      position="fixed"
      left="0"
      top="0"
      right="0"
      zIndex="1"
    >
      <Flex as="nav" marginX="2">
        <Flex alignItems="center" width="full" mr="2">
          <Link to="/">
            <Button
              leftIcon={<FiLayers />}
              colorScheme="teal"
              variant="link"
              mr="2"
            >
              lurkershub
            </Button>
          </Link>
          <Box as="form">
            <Input placeholder="Search and discover" />
          </Box>
        </Flex>
        <Menu>
          <MenuButton as={Button} rightIcon={<FiChevronDown />}>
            <Icon as={FiUser} />
          </MenuButton>
          <MenuList>
            <MenuItem>Dark mode</MenuItem>
            <MenuItem>Data saver</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  );
}

export default Header;
