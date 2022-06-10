import React from "react";
import {
  Box,
  Button,
  ButtonGroup,
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
import { Link, useNavigate, useParams } from "react-router-dom";
import { equals } from "ramda";

type Sort = "hot" | "new" | "top";

function Header() {
  const backgroundColor = useColorModeValue("white", "gray.800");
  const navigate = useNavigate();
  const params = useParams<{ sort: Sort; sub: string }>();
  const sub = params.sub;
  const sort = params.sort || "hot";
  const [value, setValue] = React.useState("");

  React.useEffect(() => {
    if (sub) {
      setValue(sub);
    } else {
      setValue("art");
    }
  }, [sub, sort]);

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value) {
      navigate(`/${value}/${sort}`);
    }
  };

  const handleOnChangeSort = (newSort: Sort) => {
    if (value) {
      navigate(`/${value}/${newSort}`);
    } else {
      navigate(`/${sub}/${newSort}`);
    }
  };

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
          <form
            style={{ marginRight: "var(--chakra-space-2)" }}
            onSubmit={handleOnSubmit}
          >
            <Input value={value} onChange={(e) => setValue(e.target.value)} />
          </form>
          <ButtonGroup size="sm" variant="outline" isAttached>
            <Button
              onClick={() => handleOnChangeSort("hot")}
              isActive={equals(sort, "hot")}
            >
              Hot
            </Button>
            <Button
              onClick={() => handleOnChangeSort("new")}
              isActive={equals(sort, "new")}
            >
              New
            </Button>
            <Button
              onClick={() => handleOnChangeSort("top")}
              isActive={equals(sort, "top")}
            >
              Top
            </Button>
          </ButtonGroup>
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
