"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { DEFAULT_SUBREDDIT } from "../lib/constants";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { GiAtSea } from "react-icons/gi";

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
    <header className="fixed top-0 z-10 flex w-full items-center border-b bg-white p-2  dark:border-b-slate-50/10 dark:bg-gray-900">
      <Link href="/" className="mr-2 flex items-center text-sm font-semibold">
        <GiAtSea size="16" className="mr-1" />
        lurkstation
      </Link>
      <form className="mr-2" onSubmit={form.handleSubmit(handleOnSubmit)}>
        <Input type="text" {...form.register("subreddit")} />
      </form>
      <div className="inline-flex">
        <Button
          as="link"
          className="rounded-r-none"
          href={username ? `user/${username}?sort=hot` : `r/${subreddit}/hot`}
        >
          Hot
        </Button>
        <Button
          as="link"
          className="rounded-l-none rounded-r-none"
          href={username ? `user/${username}?sort=new` : `r/${subreddit}/new`}
        >
          New
        </Button>
        <Button
          as="link"
          className="rounded-l-none"
          href={
            username
              ? `user/${username}?sort=top&t=all`
              : `r/${subreddit}/top?t=all`
          }
        >
          Top
        </Button>
      </div>
    </header>
  );
}
