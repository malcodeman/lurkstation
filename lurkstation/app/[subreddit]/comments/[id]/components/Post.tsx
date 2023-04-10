"use client";
import { Post } from "@/types";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";
import { length, map } from "ramda";

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
  const comments = data?.comments.children;
  const mediaClassName = "w-full h-full object-cover md:object-contain";

  if (!post) {
    return null;
  }

  return (
    <main className="mt-[46px] md:grid md:gap-2 md:grid-cols-[1fr_365px] md:h-[calc(100vh_-_46px)]">
      <div className="relative w-full h-full aspect-square overflow-y-hidden">
        {post.is_video ? (
          <video src={post.url} controls className={mediaClassName} />
        ) : (
          <Image
            src={post.url}
            alt=""
            fill
            priority
            className={mediaClassName}
          />
        )}
      </div>
      <div className="p-2 overflow-y-auto">
        <div className="mb-2">
          <span className="text-xs">{post.author}</span>
          <h1 className="text-xl">{post.title}</h1>
          <span className="text-xs">{post.ups} ups</span>
        </div>
        <div>
          <h2 className="text-l">{length(comments)} comments</h2>
          <div>
            {map(
              (item) => (
                <div key={item.data.id} className="mb-2">
                  <span className="text-xs">{item.data.author}</span>
                  <p className="text-sm break-words text-white/80">
                    {item.data.body}
                  </p>
                  <span className="text-xs">{item.data.ups} ups</span>
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
