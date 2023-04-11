import { formatDistanceToNowStrict } from "date-fns";

type Props = {
  createdAt: number;
  ups: number;
};

export function Details(props: Props) {
  const { createdAt, ups } = props;
  return (
    <div>
      <span className="text-xs">{new Intl.NumberFormat().format(ups)} ups</span>{" "}
      <span className="text-xs">
        {formatDistanceToNowStrict(createdAt * 1000, {
          addSuffix: true,
        })}
      </span>
    </div>
  );
}
