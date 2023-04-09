import { REDDIT_API } from "@/app/lib/constants";
import { Sort } from "@/types";
import { NextResponse } from "next/server";
import { parse } from "path";
import { filter, map, replace, isEmpty, not } from "ramda";

function getExtension(path: string) {
  return parse(path).ext;
}

function parseGifv(url: string) {
  return replace("gifv", "mp4", url);
}

type Params = {
  subreddit: string;
  sort: Sort;
};
type Data = {
  data: {
    after: string;
    before: string | null;
    children: {
      data: {
        url: string;
        is_video: boolean;
      };
      kind: string;
    }[];
  };
};

export async function GET(
  _request: NextResponse,
  { params }: { params: Params }
) {
  try {
    const res = await fetch(
      `${REDDIT_API}/r/${params.subreddit}/${params.sort}.json`
    );
    const data: Data = await res.json();
    const filtered = filter(
      (item) => not(isEmpty(getExtension(item.data.url))),
      data.data.children
    );
    const posts = map((item) => {
      if (getExtension(item.data.url) === ".gifv") {
        return {
          ...item,
          data: {
            ...item.data,
            is_video: true,
            url: parseGifv(item.data.url),
          },
        };
      }
      return item;
    }, filtered);
    return NextResponse.json({ ...data.data, children: posts });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message, name: error.name });
    }
    return NextResponse.json({ message: "", name: "" });
  }
}