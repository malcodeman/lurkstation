"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const defaultValues = {
  subreddit: "",
};

type Values = {
  subreddit: string;
};

export default function Header() {
  const form = useForm({ defaultValues });
  const { push } = useRouter();

  const handleOnSubmit = (values: Values) => {
    push(`/${values.subreddit}/hot`);
  };

  return (
    <header className="flex items-center p-2 fixed top-0 w-full z-10 bg-white">
      <Link href="/" className="mr-2 text-sm">
        lurkstation
      </Link>
      <form onSubmit={form.handleSubmit(handleOnSubmit)}>
        <input
          type="text"
          className="w-full rounded-md border p-1 text-sm border-[#d6d6d6]"
          {...form.register("subreddit")}
        />
      </form>
    </header>
  );
}