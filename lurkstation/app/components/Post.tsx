import { Post } from "@/types";
import Image from "next/image";

export default function Post(props: Post) {
  const { url, ...rest } = props;
  return (
    <div className="relative" {...rest}>
      <Image src={url} alt="" fill />
    </div>
  );
}
