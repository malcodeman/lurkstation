"use client";
import Posts from "@/app/components/Posts";
import { DEFAULT_SORT, DEFAULT_SUBREDDIT } from "./lib/constants";
import { useEffect } from "react";

export default function App() {
  const subreddit = DEFAULT_SUBREDDIT;
  const sort = DEFAULT_SORT;
  const time = "";
  const queryKey = ["posts", subreddit, sort, time];

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://www.reddit.com/r/pics/top.json`);
      const data = await response.json();
      console.log(data);
    };

    fetchData();
  }, []);

  return <Posts queryKey={queryKey} />;
}
