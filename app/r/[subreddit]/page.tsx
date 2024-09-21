import Posts from "@/app/_components/Posts";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { subreddit: string };
}): Promise<Metadata> {
  return {
    title: `${params.subreddit} | lurkstation`,
  };
}

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
