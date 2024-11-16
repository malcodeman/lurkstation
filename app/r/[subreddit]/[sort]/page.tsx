import Posts from "@/app/_components/Posts";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subreddit: string; sort: string }>;
}): Promise<Metadata> {
  const subreddit = (await params).subreddit;

  return {
    title: `${subreddit} | lurkstation`,
  };
}

type Props = {
  params: Promise<{ subreddit: string; sort: string }>;
  searchParams: Promise<{ t: string }>;
};

export default async function Sort(props: Props) {
  const { params, searchParams } = props;
  const subreddit = (await params).subreddit;
  const sort = (await params).sort;
  const time = (await searchParams).t;
  const queryKey = ["posts", subreddit, sort, time];

  return <Posts queryKey={queryKey} />;
}
