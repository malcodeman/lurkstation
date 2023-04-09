"use client";
import { useQuery } from "@tanstack/react-query";
import { map } from "ramda";
import { useParams } from "next/navigation";
import Post from "@/app/components/Post";

export default function Posts() {
  const params = useParams();
  const subreddit = params.subreddit || "art";
  const sort = params.sort || "hot";
  const { data } = useQuery({
    queryKey: ["posts"],
    queryFn: () => fetch(`/api/${subreddit}/${sort}`).then((res) => res.json()),
  });
  const posts = data?.children || [];

  return (
    <main className="mt-[46px] grid auto-rows-[280px] grid-cols-[repeat(auto-fit,minmax(270px,1fr))]">
      {map(
        (item) => (
          <Post
            key={item.data.id}
            url={item.data.url}
            isVideo={item.data.is_video}
          />
        ),
        posts
      )}
    </main>
  );
}
