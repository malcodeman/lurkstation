import { REDDIT_API } from "@/app/lib/constants";
import { parsePost, parsePosts } from "@/app/lib/utils";
import { RedditPost, Sort } from "@/types";
import { NextResponse } from "next/server";
import { map } from "ramda";

type Params = {
  username: string;
  sort: Sort;
};
type Data = {
  data: {
    after: string;
    before: string | null;
    children: RedditPost[];
  };
  error: string;
  message: string;
};

// https://www.reddit.com/dev/api/#GET_user_{username}_{where}
export async function GET(request: Request, { params }: { params: Params }) {
  try {
    const { searchParams } = new URL(request.url);
    const sort = searchParams.get("sort");
    const t = searchParams.get("t");
    const after = searchParams.get("after");
    const limit = searchParams.get("limit");
    const response = await fetch(
      `${REDDIT_API}/user/${params.username}/submitted.json?sort=${sort}&t=${t}&after=${after}&limit${limit}&raw_json=1`
    );
    const data: Data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    const filtered = parsePosts(data.data.children);
    const posts = map((item) => parsePost(item), filtered);

    return NextResponse.json({ ...data.data, children: posts });
  } catch (error) {
    if (error instanceof Error) {
      switch (error.message) {
        default:
          return new Response(error.message, {
            status: 500,
          });
        case "Forbidden":
          return new Response("Forbidden", {
            status: 403,
          });
        case "Not Found":
          return new Response("Not Found", {
            status: 404,
          });
      }
    }
    return new Response("Internal", {
      status: 500,
    });
  }
}
