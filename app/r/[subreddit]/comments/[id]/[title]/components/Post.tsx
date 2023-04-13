"use client";
import { Post } from "@/types";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { length, map } from "ramda";
import { FiX } from "react-icons/fi";
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
  const mediaClassName = "h-full w-full object-cover md:object-contain md:p-2";
  const router = useRouter();

  if (!post) {
    return null;
  }

  const renderAuthor = (author: string) => {
    if (author === "[deleted]") {
      return <span className="text-xs">[deleted]</span>;
    }
    return (
      <Link href={`/user/${author}`} className="text-xs">
        {author}
      </Link>
    );
  };

  return (
    <main className="mt-[45px] md:grid md:h-[calc(100vh_-_45px)] md:grid-cols-[1fr_365px] md:gap-2">
      <div className="group relative aspect-square h-full w-full overflow-y-hidden">
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
      <div className="overflow-y-auto bg-white p-2 dark:bg-[#111827]">
        <div className="mb-4 border-b pb-4 dark:border-slate-50/10">
          <div className="flex items-center">
            {renderAuthor(post.author)}
            <FiX
              className="ml-auto cursor-pointer"
              onClick={() => router.back()}
            />
          </div>
          <h1 className="text-2xl">{post.title}</h1>
          <Details ups={post.ups} createdAt={post.created_utc} />
        </div>
        <div>
          <h2 className="text-l">{length(comments)} comments</h2>
          <div>
            {map(
              (item) => (
                <div key={item.data.id} className="mb-2">
                  {renderAuthor(item.data.author)}
                  <p className="break-words text-sm text-gray-500 dark:text-gray-400">
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
