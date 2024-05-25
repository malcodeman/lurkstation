import Posts from "@/app/_components/Posts";

type Props = {
  params: { subreddit: string };
};

export default function Sort(props: Props) {
  const { params } = props;
  const subreddit = params.subreddit;
  const sort = "hot";
  const queryKey = ["posts", subreddit, sort];

  return <Posts queryKey={queryKey} />;
}
