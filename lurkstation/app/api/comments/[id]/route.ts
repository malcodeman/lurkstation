import { REDDIT_API } from "@/app/lib/constants";
import { parsePost } from "@/app/lib/utils";
import { NextResponse } from "next/server";

type Params = {
  id: string;
};

export async function GET(
  _request: NextResponse,
  { params }: { params: Params }
) {
  try {
    const response = await fetch(`${REDDIT_API}/comments/${params.id}.json`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    const post = parsePost(data[0].data.children[0]);
    const comments = data[1].data;
    return NextResponse.json({ post, comments });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message, name: error.name });
    }
    return NextResponse.json({ message: "", name: "" });
  }
}
