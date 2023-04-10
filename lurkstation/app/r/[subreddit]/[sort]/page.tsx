import Posts from "@/app/components/Posts";

type Props = {
  params: { subreddit: string; sort: string };
  searchParams: { t: string };
};

export default function Sort(props: Props) {
  const { params, searchParams } = props;
  const subreddit = params.subreddit;
  const sort = params.sort;
  const time = searchParams.t;
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
