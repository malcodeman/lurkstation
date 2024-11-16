import { useParams } from "next/navigation";
import { parseParam } from "@/app/_lib/utils";
import { useQuery } from "@tanstack/react-query";
import { getComments } from "@/app/_lib/queries";

export const useComments = () => {
  const params = useParams();
  const id = parseParam(params.id);
  const { data } = useQuery({
    queryKey: ["post", id],
    queryFn: () => getComments(id!),
    enabled: !!id,
  });
  const post = data?.post.data;
  const comments = data?.comments || [];

  return { post, comments };
};
