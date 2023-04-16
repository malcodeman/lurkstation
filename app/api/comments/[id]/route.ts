import { REDDIT_API } from "@/app/lib/constants";
import { parseComments, parsePost } from "@/app/lib/utils";
import { Post, Comment } from "@/types";
import { NextResponse } from "next/server";

type Params = {
  id: string;
};
type Data = [
  { kind: string; data: { children: Post[] } },
  { kind: string; data: { children: Comment[] } }
];

export async function GET(_request: Request, { params }: { params: Params }) {
  try {
    const response = await fetch(`${REDDIT_API}/comments/${params.id}.json`);
    const data: Data = await response.json();

    if (!response.ok) {
      throw new Error();
    }

    const post = parsePost(data[0].data.children[0]);
    const comments = parseComments(data[1].data.children);

    return NextResponse.json({ post, comments });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message, name: error.name });
    }
    return NextResponse.json({ message: "", name: "" });
  }
}
