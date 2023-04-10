import Posts from "@/app/components/Posts";
import { DEFAULT_SORT, DEFAULT_SUBREDDIT } from "./lib/constants";

export default function App() {
  const subreddit = DEFAULT_SUBREDDIT;
  const sort = DEFAULT_SORT;
  const time = "";
  const getNextPageParamReturn = {
    subreddit,
    sort,
    time,
  };
  const queryKey = ["posts", subreddit, sort, time];

  return (
    <Posts
      queryKey={queryKey}
      getNextPageParamReturn={getNextPageParamReturn}
    />
  );
}
