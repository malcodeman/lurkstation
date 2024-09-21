import Post from "@/app/r/[subreddit]/comments/[id]/[title]/_components/Post";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { id: string; title: string };
}): Promise<Metadata> {
  return {
    title: `${params.title} | lurkstation`,
  };
}

export default async function CommentTree() {
  return <Post />;
}
