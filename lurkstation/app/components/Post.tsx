import { Post } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { FcPicture, FcVideoCall } from "react-icons/fc";

type Props = {
  url: string;
  isVideo: boolean;
  href: string;
};

export default function Post(props: Props) {
  const { url, isVideo, href } = props;

  return (
    <Link href={href}>
      <div className="relative w-full h-full aspect-square">
        {isVideo ? (
          <video src={url} className="w-full h-full object-cover" />
        ) : (
          <Image src={url} alt="" fill className="w-full h-full object-cover" />
        )}
        {isVideo ? (
          <FcVideoCall className="absolute right-2 bottom-2" />
        ) : (
          <FcPicture className="absolute right-2 bottom-2" />
        )}
      </div>
    </Link>
  );
}
