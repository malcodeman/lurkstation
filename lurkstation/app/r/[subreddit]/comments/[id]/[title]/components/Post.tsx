"use client";
import { Post } from "@/types";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { length, map } from "ramda";
import { Options } from "./Options";
import { Details } from "./Details";

const getComments = async (id: string) => {
  const response = await fetch(`/api/comments/${id}`);
  return response.json();
};

export default function Post() {
  const params = useParams();
  const id = params.id;
  const { data } = useQuery({
    queryKey: ["post", id],
    queryFn: () => getComments(id),
  });
  const post = data?.post.data;
  const comments = data?.comments;
  const mediaClassName = "p-2 w-full h-full object-cover md:object-contain";

  if (!post) {
    return null;
  }

  return (
    <main className="mt-[46px] md:grid md:gap-2 md:grid-cols-[1fr_365px] md:h-[calc(100vh_-_46px)]">
      <div className="group relative w-full h-full aspect-square overflow-y-hidden">
        {post.is_video ? (
          <video
            src={post.url}
            controls
            loop
            autoPlay
            muted
            className={mediaClassName}
          />
        ) : (
          <Image
            src={post.url}
            alt=""
            fill
            priority
            className={mediaClassName}
          />
        )}
        <Options url={post.url} filename={post.id} />
      </div>
      <div className="p-2 overflow-y-auto bg-white dark:bg-black">
        <div className="mb-2">
          {post.author === "[deleted]" ? null : (
            <Link href={`/user/${post.author}`} className="text-xs">
              {post.author}
            </Link>
          )}
          <h1 className="text-xl">{post.title}</h1>
          <Details ups={post.ups} createdAt={post.created_utc} />
        </div>
        <div>
          <h2 className="text-l">{length(comments)} comments</h2>
          <div>
            {map(
              (item) => (
                <div key={item.data.id} className="mb-2">
                  <span className="text-xs">{item.data.author}</span>
                  <p className="text-sm break-words text-[#454745] dark:text-[#bab8ba]">
                    {item.data.body}
                  </p>
                  <Details
                    ups={item.data.ups}
                    createdAt={item.data.created_utc}
                  />
                </div>
              ),
              comments
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
