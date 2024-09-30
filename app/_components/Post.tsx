import Link from "next/link";
import { FcVideoCall, FcImageFile, FcGallery } from "react-icons/fc";

type Props = {
  url: string;
  isVideo: boolean;
  href: string;
  isGallery: boolean;
  title: string;
};

const renderIcon = ({
  isVideo,
  isGallery,
}: {
  isVideo: boolean;
  isGallery: boolean;
}) => {
  if (isVideo) {
    return <FcVideoCall className="absolute bottom-2 right-2" />;
  }

  if (isGallery) {
    return <FcGallery className="absolute bottom-2 right-2" />;
  }

  return <FcImageFile className="absolute bottom-2 right-2" />;
};

export default function Post(props: Props) {
  const { url, isVideo, href, isGallery, title } = props;

  return (
    <Link href={href} aria-label={title} data-testid="post">
      <div className="relative aspect-square h-full w-full">
        {isVideo ? (
          <video src={url} className="h-full w-full object-cover" />
        ) : (
          <img src={url} alt="" className="h-full w-full object-cover" />
        )}
        {renderIcon({ isGallery, isVideo })}
      </div>
    </Link>
  );
}
