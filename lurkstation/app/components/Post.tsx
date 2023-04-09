import { Post } from "@/types";
import Image from "next/image";
import Link from "next/link";

type Props = {
  url: string;
  isVideo: boolean;
  href: string;
};

export default function Post(props: Props) {
  const { url, isVideo, href } = props;

  if (isVideo) {
    return (
      <Link href={href}>
        <div className="relative w-full h-full">
          <video src={url} className="w-full h-full object-cover" />
        </div>
      </Link>
    );
  }

  return (
    <Link href={href}>
      <div className="relative w-full h-full">
        <Image src={url} alt="" fill className="w-full h-full object-cover" />
      </div>
    </Link>
  );
}
