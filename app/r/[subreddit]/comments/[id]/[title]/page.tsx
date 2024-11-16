import Post from "@/app/r/[subreddit]/comments/[id]/[title]/_components/Post";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; title: string }>;
}): Promise<Metadata> {
  const title = (await params).title;

  return {
    title: `${title} | lurkstation`,
  };
}

export default async function CommentTree() {
  return <Post />;
}
