"use client";
import { Post } from "@/types";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";

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

  const renderPost = (post: Post) => {
    const { is_video, url } = post.data;

    if (is_video) {
      return (
        <div className="relative w-full h-full overflow-y-hidden">
          <video src={url} controls className="w-full h-full object-contain" />
        </div>
      );
    }
    return (
      <div className="relative w-full h-full">
        <Image src={url} alt="" fill className="w-full h-full object-contain" />
      </div>
    );
  };

  return (
    <main className="mt-[46px] grid grid-cols-[1fr_365px] h-[calc(100vh_-_46px)]">
      {data?.post ? renderPost(data.post) : null}
    </main>
  );
}
