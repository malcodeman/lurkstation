import Posts from "@/app/_components/Posts";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { subreddit: string; sort: string };
}): Promise<Metadata> {
  return {
    title: `${params.subreddit} | lurkstation`,
  };
}

type Props = {
  params: { subreddit: string; sort: string };
  searchParams: { t: string };
};

export default function Sort(props: Props) {
  const { params, searchParams } = props;
  const subreddit = params.subreddit;
  const sort = params.sort;
  const time = searchParams.t;
  const queryKey = ["posts", subreddit, sort, time];

  return <Posts queryKey={queryKey} />;
}
