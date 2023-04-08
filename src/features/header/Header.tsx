import React from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiLayers, FiChevronDown } from "react-icons/fi";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { equals } from "ramda";
import { useDocumentTitle } from "@react-hookz/web";

import UserMenu from "./UserMenu";

type Sort = "hot" | "new" | "top";
type Time = "hour" | "day" | "week" | "month" | "year" | "all";

function Header() {
  const backgroundColor = useColorModeValue("white", "gray.800");
  const navigate = useNavigate();
  const params = useParams<{ sort: Sort; sub: string }>();
  const sub = params.sub || "art";
  const sort = params.sort || "hot";
  const [searchParams] = useSearchParams();
  const time = searchParams.get("t");
  const [value, setValue] = React.useState("");
  const boxShadow = useColorModeValue(
    "rgba(0, 0, 0, 0.03) 0px 2px 0px 0px",
    "rgba(255, 255, 255, 0.03) 0px 2px 0px 0px"
  );

  useDocumentTitle(`${sub} | lurkstation`);

  React.useEffect(() => {
    if (sub) {
      setValue(sub);
    }
  }, [sub, sort]);

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value) {
      if (time) {
        navigate(`/${value}/${sort}?t=${time}`);
      } else {
        navigate(`/${value}/${sort}`);
      }
    }
  };

  const handleOnChangeSort = (newSort: Sort) => {
    navigate(`/${sub}/${newSort}`);
  };

  const handleOnChangeTime = (newTime: Time) => {
    navigate(`/${sub}/${sort}?t=${newTime}`);
  };

  const renderTimeLabel = () => {
    switch (time) {
      case "hour":
        return "Now";
      case "day":
      default:
        return "Today";
      case "week":
        return "This week";
      case "month":
        return "This month";
      case "year":
        return "This year";
      case "all":
        return "All time";
    }
  };

  const renderSortLabel = () => {
    switch (sort) {
      default:
      case "hot":
        return "Hot";
      case "new":
        return "New";
      case "top":
        return "Top";
    }
  };

  return (
    <Box
      boxShadow={boxShadow}
      backgroundColor={backgroundColor}
      as="header"
      paddingY="2"
      position="fixed"
      left="0"
      top="0"
      right="0"
      zIndex="1"
    >
      <Flex as="nav" marginX="2" alignItems="center">
        <Flex alignItems="center" width="full" mr="2">
          <Link to="/">
            <Button
              leftIcon={<FiLayers />}
              colorScheme="teal"
              variant="link"
              mr="2"
            >
              lurkstation
            </Button>
          </Link>
          <form
            style={{ marginRight: "var(--chakra-space-2)" }}
            onSubmit={handleOnSubmit}
          >
            <Input
              data-cy="search-input"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              size="sm"
              borderRadius="md"
            />
          </form>
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<FiChevronDown />}
              size="sm"
              variant="outline"
              mr="2"
              display={["inline-flex", "inline-flex", "none"]}
            >
              {renderSortLabel()}
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => handleOnChangeSort("hot")}>Hot</MenuItem>
              <MenuItem onClick={() => handleOnChangeSort("new")}>New</MenuItem>
              <MenuItem onClick={() => handleOnChangeSort("top")}>Top</MenuItem>
            </MenuList>
          </Menu>
          <ButtonGroup
            display={["none", "none", "inline-flex"]}
            size="sm"
            variant="outline"
            mr="2"
            isAttached
          >
            <Button
              onClick={() => handleOnChangeSort("hot")}
              isActive={equals(sort, "hot")}
              data-cy="hot-button"
            >
              Hot
            </Button>
            <Button
              onClick={() => handleOnChangeSort("new")}
              isActive={equals(sort, "new")}
              data-cy="new-button"
            >
              New
            </Button>
            <Button
              onClick={() => handleOnChangeSort("top")}
              isActive={equals(sort, "top")}
              data-cy="top-button"
            >
              Top
            </Button>
          </ButtonGroup>
          {equals(sort, "top") ? (
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<FiChevronDown />}
                size="sm"
                variant="outline"
                data-cy="time-menu-button"
              >
                {renderTimeLabel()}
              </MenuButton>
              <MenuList>
                <MenuItem
                  onClick={() => handleOnChangeTime("hour")}
                  data-cy="hour-menu-item"
                >
                  Now
                </MenuItem>
                <MenuItem
                  onClick={() => handleOnChangeTime("day")}
                  data-cy="day-menu-item"
                >
                  Today
                </MenuItem>
                <MenuItem
                  onClick={() => handleOnChangeTime("week")}
                  data-cy="week-menu-item"
                >
                  This week
                </MenuItem>
                <MenuItem
                  onClick={() => handleOnChangeTime("month")}
                  data-cy="month-menu-item"
                >
                  This month
                </MenuItem>
                <MenuItem
                  onClick={() => handleOnChangeTime("year")}
                  data-cy="year-menu-item"
                >
                  This year
                </MenuItem>
                <MenuItem
                  onClick={() => handleOnChangeTime("all")}
                  data-cy="all-menu-item"
                >
                  All time
                </MenuItem>
              </MenuList>
            </Menu>
          ) : null}
        </Flex>
        <UserMenu />
      </Flex>
    </Box>
  );
}

export default Header;
