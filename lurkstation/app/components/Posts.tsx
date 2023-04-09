"use client";
import { useQuery } from "@tanstack/react-query";
import { map } from "ramda";

import Post from "./Post";

export default function Posts() {
  const { data } = useQuery({
    queryKey: ["posts"],
    queryFn: () => fetch("/api/art/hot").then((res) => res.json()),
  });
  const posts = data?.children || [];

  return (
    <main className="grid auto-rows-[280px] grid-cols-[repeat(auto-fit,minmax(270px,1fr))]">
      {map(
        (item) => (
          <Post key={item.data.id} url={item.data.url} />
        ),
        posts
      )}
    </main>
  );
}
