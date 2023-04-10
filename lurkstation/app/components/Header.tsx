"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { DEFAULT_SUBREDDIT } from "../lib/constants";

const defaultValues = {
  subreddit: "",
};

type Values = {
  subreddit: string;
};

export default function Header() {
  const params = useParams();
  const subreddit = params.subreddit || DEFAULT_SUBREDDIT;
  const username = params.username;
  const form = useForm({
    defaultValues,
  });
  const { push } = useRouter();

  useEffect(() => {
    form.reset({ subreddit });
  }, [subreddit]);

  const handleOnSubmit = (values: Values) => {
    push(`/${values.subreddit}/hot`);
  };

  return (
    <header className="flex items-center p-2 fixed top-0 w-full z-10 bg-white text-black/80">
      <Link href="/" className="mr-2 text-sm">
        lurkstation
      </Link>
      <form className="mr-1" onSubmit={form.handleSubmit(handleOnSubmit)}>
        <input
          type="text"
          className="w-full rounded-md border p-1 text-sm border-[#d6d6d6]"
          {...form.register("subreddit")}
        />
      </form>
      <div className="inline-flex">
        <Link
          href={username ? `user/${username}?sort=hot` : `${subreddit}/hot`}
        >
          <button className="p-1 text-sm border rounded-md rounded-r-none me-[-1px] border-[#d6d6d6]">
            Hot
          </button>
        </Link>
        <Link
          href={username ? `user/${username}?sort=new` : `${subreddit}/new`}
        >
          <button className="p-1 text-sm border me-[-1px] border-[#d6d6d6]">
            New
          </button>
        </Link>
        <Link
          href={
            username
              ? `user/${username}?sort=top&t=all`
              : `${subreddit}/top?t=all`
          }
        >
          <button className="p-1 text-sm border rounded-md rounded-l-none border-[#d6d6d6]">
            Top
          </button>
        </Link>
      </div>
    </header>
  );
}
