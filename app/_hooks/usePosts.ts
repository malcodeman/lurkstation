import { useInfiniteQuery } from "@tanstack/react-query";
import { equals, map } from "ramda";
import { RedditPost, Sort } from "@/types";
import { REDDIT_API } from "@/app/_lib/constants";
import { parsePost, parsePosts } from "@/app/_lib/utils";
import axios from "axios";

type JsonData = {
  data: {
    after: string;
    before: string | null;
    children: RedditPost[];
  };
  error: string;
  message: string;
};

type SubredditPageParam = {
  subreddit: string;
  sort: Sort;
  time: string | null;
  after: string | null;
};

const getSubreddit = async (props: { pageParam: SubredditPageParam }) => {
  const { pageParam } = props;
  const response = await axios.get(
    `${REDDIT_API}/r/${pageParam.subreddit}/${pageParam.sort}.json`,
    {
      params: {
        t: pageParam.time,
        after: pageParam.after,
        raw_json: 1,
      },
    },
  );
  const data: JsonData = response.data;
  const filtered = parsePosts(data.data.children);
  const posts = map((item) => parsePost(item), filtered);

  return { ...data.data, children: posts };
};

type UserPageParam = {
  username: string;
  sort: Sort;
  time: string | null;
  after: string | null;
};

const getUser = async (props: { pageParam: UserPageParam }) => {
  const { pageParam } = props;
  const response = await axios.get(
    `${REDDIT_API}/user/${pageParam.username}/submitted.json`,
    {
      params: {
        sort: pageParam.sort,
        t: pageParam.time,
        after: pageParam.after,
        raw_json: 1,
      },
    },
  );
  const data: JsonData = response.data;
  const filtered = parsePosts(data.data.children);
  const posts = map((item) => parsePost(item), filtered);

  return { ...data.data, children: posts };
};

type PageParam = SubredditPageParam | UserPageParam | undefined;

type Data =
  | {
      pages: {
        after: string | null;
        before: string | null;
        children: RedditPost[];
        dist: number;
        geo_filter: null;
        modhash: string;
      }[];
      pageParam: PageParam;
    }
  | undefined;

type Props = {
  queryKey: string[];
};

export const usePosts = (props: Props) => {
  const { queryKey } = props;
  const isPosts = equals(queryKey[0], "posts");
  const { data, hasNextPage, isFetching, isError, error, fetchNextPage } =
    useInfiniteQuery<any, Error, Data, string[], PageParam>({
      queryKey,
      queryFn: ({ pageParam }) =>
        isPosts
          ? getSubreddit({
              pageParam: {
                subreddit: queryKey[1],
                sort: queryKey[2] as Sort,
                time: queryKey[3],
                after: pageParam?.after || null,
              },
            })
          : getUser({
              pageParam: {
                username: queryKey[1],
                sort: queryKey[2] as Sort,
                time: queryKey[3],
                after: pageParam?.after || null,
              },
            }),
      getNextPageParam: (lastPage) => {
        if (!lastPage.after) {
          return undefined;
        }
        return { ...lastPage };
      },
      initialPageParam: undefined,
    });
  const pages = data?.pages || [];

  return { pages, hasNextPage, isFetching, isError, error, fetchNextPage };
};
