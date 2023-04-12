import { REDDIT_API } from "@/app/lib/constants";
import { getExtension, parsePost } from "@/app/lib/utils";
import { Post, Sort } from "@/types";
import { NextResponse } from "next/server";
import { filter, map, isEmpty, not } from "ramda";

type Params = {
  subreddit: string;
  sort: Sort;
};
type Data = {
  data: {
    after: string;
    before: string | null;
    children: Post[];
  };
  error: string;
  message: string;
};

// https://www.reddit.com/dev/api/#GET_{sort}
export async function GET(
  request: NextResponse,
  { params }: { params: Params }
) {
  try {
    const { searchParams } = new URL(request.url);
    const t = searchParams.get("t");
    const after = searchParams.get("after");
    const limit = searchParams.get("limit");
    const response = await fetch(
      `${REDDIT_API}/r/${params.subreddit}/${params.sort}.json?&t=${t}&after=${after}&limit${limit}`
    );
    const data: Data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    const filtered = filter(
      (item) => not(isEmpty(getExtension(item.data.url))),
      data.data.children
    );
    const posts = map((item) => parsePost(item), filtered);
    return NextResponse.json({ ...data.data, children: posts });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message, name: error.name });
    }
    return NextResponse.json({ message: "", name: "" });
  }
}
