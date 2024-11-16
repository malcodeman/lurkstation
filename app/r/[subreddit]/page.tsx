import Posts from "@/app/_components/Posts";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subreddit: string }>;
}): Promise<Metadata> {
  const subreddit = (await params).subreddit;

  return {
    title: `${subreddit} | lurkstation`,
  };
}

type Props = {
  params: Promise<{ subreddit: string }>;
};

export default async function Sort(props: Props) {
  const { params } = props;
  const subreddit = (await params).subreddit;
  const sort = "hot";
  const queryKey = ["posts", subreddit, sort];

  return <Posts queryKey={queryKey} />;
}
