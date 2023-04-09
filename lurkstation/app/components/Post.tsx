import { Post } from "@/types";
import Image from "next/image";

export default function Post(props: Post) {
  const { url, isVideo, ...rest } = props;

  if (isVideo) {
    return (
      <div className="relative w-full h-full" {...rest}>
        <video src={url} className="w-full h-full object-cover" />
      </div>
    );
  }

  return (
    <div className="relative w-full h-full" {...rest}>
      <Image
        src={url}
        alt=""
        fill
        sizes="280px"
        className="w-full h-full object-cover"
      />
    </div>
  );
}
