import { REDDIT_API } from "@/app/lib/constants";
import { Sort } from "@/types";
import { NextResponse } from "next/server";

type Params = {
  subreddit: string;
  sort: Sort;
};

export async function GET(
  _request: NextResponse,
  { params }: { params: Params }
) {
  try {
    const res = await fetch(
      `${REDDIT_API}/r/${params.subreddit}/${params.sort}.json`
    );
    const data = await res.json();
    return NextResponse.json(data.data);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message, name: error.name });
    }
    return NextResponse.json({ message: "", name: "" });
  }
}
