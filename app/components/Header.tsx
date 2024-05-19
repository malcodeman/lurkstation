"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { DEFAULT_SUBREDDIT } from "@/app/lib/constants";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { GiAtSea } from "react-icons/gi";
import { useSearchParams } from "next/navigation";
import TimePopover from "@/app/components/TimePopover";
import { parseParam } from "@/app/lib/utils";

const defaultValues = {
  subreddit: "",
};

type Values = {
  subreddit: string;
};

export default function Header() {
  const params = useParams();
  const subreddit = parseParam(params.subreddit) || DEFAULT_SUBREDDIT;
  const username = params.username;
  const searchParams = useSearchParams();
  const time = searchParams.get("t");
  const form = useForm({
    defaultValues,
  });
  const { push } = useRouter();

  useEffect(() => {
    if (username) {
      form.reset(defaultValues);
    } else {
      form.reset({ subreddit });
    }
  }, [form, subreddit, username]);

  const handleOnSubmit = (values: Values) => {
    push(`/r/${values.subreddit}/hot`);
  };

  return (
    <header className="fixed bottom-0 z-10 flex w-full items-center border-t bg-white p-2 dark:border-b-slate-50/10 dark:border-t-slate-50/10 dark:bg-gray-900 sm:bottom-auto sm:top-0 sm:border-b sm:border-t-0">
      <Link
        href="/"
        className="mr-2 flex items-center text-sm font-semibold"
        aria-label="home"
      >
        <GiAtSea size={16} className="sm:mr-1" />
        <span className="hidden sm:inline">lurkstation</span>
      </Link>
      <form className="mr-2" onSubmit={form.handleSubmit(handleOnSubmit)}>
        <Input
          type="text"
          data-testid="subreddit-input"
          aria-label="subreddit"
          {...form.register("subreddit")}
        />
      </form>
      <div className={time ? "mr-2 inline-flex" : "inline-flex"}>
        <Button
          as="link"
          className="rounded-r-none"
          href={username ? `/user/${username}?sort=hot` : `/r/${subreddit}/hot`}
          data-testid="sort-hot-link"
        >
          Hot
        </Button>
        <Button
          as="link"
          className="rounded-l-none rounded-r-none"
          href={username ? `/user/${username}?sort=new` : `/r/${subreddit}/new`}
          data-testid="sort-new-link"
        >
          New
        </Button>
        <Button
          as="link"
          className="rounded-l-none"
          href={
            username
              ? `/user/${username}?sort=top&t=all`
              : `/r/${subreddit}/top?t=day`
          }
          data-testid="sort-top-link"
        >
          Top
        </Button>
      </div>
      {time ? <TimePopover /> : null}
    </header>
  );
}
