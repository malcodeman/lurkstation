import axios from "axios";
import { REDDIT_API } from "./constants";
import { parseComments, parsePost } from "./utils";
import { CommentTree } from "@/types";

export const getComments = async (id: string) => {
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
