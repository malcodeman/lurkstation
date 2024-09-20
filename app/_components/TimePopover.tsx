import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { map } from "ramda";
import { Menu, MenuButton, MenuItem, MenuList } from "@/components/Menu";

const TIME = [
  {
    value: "hour",
    label: "Now",
  },
  {
    value: "day",
    label: "Today",
  },
  {
    value: "week",
    label: "This week",
  },
  {
    value: "month",
    label: "This month",
  },
  {
    value: "year",
    label: "This year",
  },
  {
    value: "all",
    label: "All time",
  },
];

const renderTimeLabel = (time: string) => {
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

export default function TimePopover() {
  const params = useParams();
  const searchParams = useSearchParams();
  const subreddit = params.subreddit;
  const username = params.username;
  const sort = params.sort;
  const time = searchParams.get("t");
  const sortSearchParam = searchParams.get("sort");
  return (
    <Menu>
      <MenuButton data-testid="time-popover-button" className="w-40">
        {renderTimeLabel(time || "")}
      </MenuButton>
      <MenuList>
        {map(
          (item) => (
            <MenuItem asChild key={item.value} value={item.value}>
              <Link
                href={
                  username
                    ? `/user/${username}?sort=${sortSearchParam}&t=${item.value}`
                    : `/r/${subreddit}/${sort}?t=${item.value}`
                }
                className="block truncate px-2.5 py-1.5 text-sm outline-none transition-all hover:text-blue-600 focus:ring-2 focus:ring-blue-600"
                data-testid={`time-popover-panel-link-${item.value}`}
              >
                {item.label}
              </Link>
            </MenuItem>
          ),
          TIME
        )}
      </MenuList>
    </Menu>
  );
}
