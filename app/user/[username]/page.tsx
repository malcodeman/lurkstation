import Posts from "@/app/_components/Posts";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { username: string };
}): Promise<Metadata> {
  return {
    title: `${params.username} | lurkstation`,
  };
}

type Props = {
  params: { username: string };
  searchParams: { sort: string; t: string };
};

export default function User(props: Props) {
  const { params, searchParams } = props;
  const username = params.username;
  const sort = searchParams.sort;
  const time = searchParams.t;
  const queryKey = ["users", username, sort, time];

  return <Posts queryKey={queryKey} />;
}
