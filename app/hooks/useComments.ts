import { useParams } from "next/navigation";
import { parseComments, parseParam, parsePost } from "../lib/utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { REDDIT_API } from "../lib/constants";
import { CommentTree, RedditPost } from "@/types";

const getComments = async (id: string) => {
  const response = await axios.get(`${REDDIT_API}/comments/${id}.json`, {
    params: {
      raw_json: 1,
    },
  });
  const data: CommentTree = response.data;
  const post = parsePost(data[0].data.children[0]);
  const comments = parseComments(data[1].data.children);

  return { post, comments };
};

export const useComments = () => {
  const params = useParams();
  const id = parseParam(params.id);
  const { data } = useQuery({
    queryKey: ["post", id],
    queryFn: () => getComments(id),
  });
  const post = data?.post.data;
  const comments = data?.comments || [];

  return { post, comments };
};
