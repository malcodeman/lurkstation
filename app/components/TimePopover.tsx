import { PopoverButton } from "@/components/Popover/PopoverButton";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { map } from "ramda";
import { PopoverPanel } from "@/components/Popover/PopoverPanel";
import { Popover as HeadlessPopover } from "@headlessui/react";
import { Popover } from "@/components/Popover/Popover";

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
    <Popover>
      <PopoverButton data-testid="time-popover-button">
        {renderTimeLabel(time || "")}
      </PopoverButton>
      <PopoverPanel>
        {map(
          (item) => (
            <HeadlessPopover.Button
              as={Link}
              key={item.value}
              href={
                username
                  ? `/user/${username}?sort=${sortSearchParam}&t=${item.value}`
                  : `/r/${subreddit}/${sort}?t=${item.value}`
              }
              className="block truncate px-2.5 py-1.5 text-sm outline-none transition-all hover:text-blue-600 focus:ring-2 focus:ring-blue-600"
              data-testid={`time-popover-panel-link-${item.value}`}
            >
              {item.label}
            </HeadlessPopover.Button>
          ),
          TIME
        )}
      </PopoverPanel>
    </Popover>
  );
}
