"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { equals, length, map } from "ramda";
import { FiX } from "react-icons/fi";
import { useKeyboardEvent } from "@react-hookz/web";
import { Options } from "@/app/r/[subreddit]/comments/[id]/[title]/_components/Options";
import { Details } from "@/app/r/[subreddit]/comments/[id]/[title]/_components/Details";
import { useComments } from "@/app/_hooks/useComments";
import { getGalleryImages } from "@/app/_lib/utils";

export default function Post() {
  const { post, comments } = useComments();
  const mediaClassName =
    "absolute h-full w-full object-cover md:object-contain md:p-2";
  const router = useRouter();

  useKeyboardEvent("Escape", () => router.back(), []);

  const renderAuthor = (author: string) => {
    if (equals(author, "[deleted]")) {
      return <span className="text-xs">[deleted]</span>;
    }
    return (
      <Link href={`/user/${author}`} className="text-xs">
        {author}
      </Link>
    );
  };

  if (!post) {
    return null;
  }

  const gallery = getGalleryImages(post.media_metadata);
  const url = post.is_gallery ? gallery[0] : post.url;

  return (
    <main className="sm:mt-[49px] md:grid md:h-[calc(100vh_-_49px)] md:grid-cols-[1fr_365px] md:gap-2">
      {post.is_gallery ? (
        <div className="flex flex-col">
          {map(
            (item) => (
              <div
                key={item}
                className="group relative aspect-square h-full w-full overflow-y-hidden md:aspect-video"
              >
                <img src={item} alt="" className={mediaClassName} />
                <Options url={item} filename={post.id} />
              </div>
            ),
            gallery,
          )}
        </div>
      ) : (
        <div className="group relative aspect-square h-full w-full overflow-y-hidden">
          {post.is_video ? (
            <video
              src={url}
              controls
              loop
              autoPlay
              muted
              className={mediaClassName}
            />
          ) : (
            <img src={url} alt="" className={mediaClassName} />
          )}
          <Options url={url} filename={post.id} />
        </div>
      )}
      <div>
        <div className="overflow-y-auto bg-white p-2 md:sticky md:top-[49px] md:h-[calc(100vh_-_49px)] dark:bg-[#111827]">
          <div className="mb-4 border-b pb-4 dark:border-slate-50/10">
            <div className="flex items-center">
              {renderAuthor(post.author)}
              <FiX
                data-testid="x-icon"
                className="ml-auto cursor-pointer"
                onClick={() => router.back()}
              />
            </div>
            <h1 className="text-2xl">{post.title}</h1>
            <Details ups={post.ups} createdAt={post.created_utc} />
          </div>
          <div>
            <h2 className="text-lg">{length(comments)} comments</h2>
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
                comments,
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
