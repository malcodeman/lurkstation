import { Post } from "@/types";
import Link from "next/link";
import { FiVideo, FiImage } from "react-icons/fi";

type Props = {
  url: string;
  isVideo: boolean;
  href: string;
};

export default function Post(props: Props) {
  const { url, isVideo, href } = props;

  return (
    <Link href={href} data-testid="post">
      <div className="relative aspect-square h-full w-full">
        {isVideo ? (
          <video src={url} className="h-full w-full object-cover" />
        ) : (
          <img src={url} alt="" className="h-full w-full object-cover" />
        )}
        {isVideo ? (
          <FiVideo className="absolute bottom-2 right-2" />
        ) : (
          <FiImage className="absolute bottom-2 right-2" />
        )}
      </div>
    </Link>
  );
}
