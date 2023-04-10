"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Sort } from "@/types";

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

  const handleOnChangeSort = (sort: Sort) => {
    if (sort === "top") {
      push(`/${subreddit}/${sort}?t=all`);
    } else {
      push(`/${subreddit}/${sort}`);
    }
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
        <button
          className="p-1 text-sm border rounded-md rounded-r-none me-[-1px] border-[#d6d6d6]"
          onClick={() => handleOnChangeSort("hot")}
        >
          Hot
        </button>
        <button
          className="p-1 text-sm border me-[-1px] border-[#d6d6d6]"
          onClick={() => handleOnChangeSort("new")}
        >
          New
        </button>
        <button
          className="p-1 text-sm border rounded-md rounded-l-none border-[#d6d6d6]"
          onClick={() => handleOnChangeSort("top")}
        >
          Top
        </button>
      </div>
    </header>
  );
}
