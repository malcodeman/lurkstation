import Posts from "@/app/_components/Posts";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string }>;
}): Promise<Metadata> {
  const username = (await params).username;

  return {
    title: `${username} | lurkstation`,
  };
}

type Props = {
  params: Promise<{ username: string }>;
  searchParams: Promise<{ sort: string; t: string }>;
};

export default async function User(props: Props) {
  const { params, searchParams } = props;
  const username = (await params).username;
  const sort = (await searchParams).sort;
  const time = (await searchParams).t;
  const queryKey = ["users", username, sort, time];

  return <Posts queryKey={queryKey} />;
}
