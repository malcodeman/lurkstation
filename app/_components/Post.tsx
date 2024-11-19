import Link from "next/link";
import { useRef, useState } from "react";
import {
  FcVideoCall,
  FcImageFile,
  FcGallery,
  FcRemoveImage,
} from "react-icons/fc";

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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isError, setIsError] = useState(false);

  const handlePlay = () => {
    videoRef.current?.play();
  };

  const handlePauseAndReset = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleOnError = () => {
    setIsError(true);
  };

  if (isError) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <FcRemoveImage size={64} />
      </div>
    );
  }

  return (
    <Link href={href} aria-label={title} data-testid="post">
      <div className="relative aspect-square h-full w-full">
        {isVideo ? (
          <video
            ref={videoRef}
            src={url}
            onMouseEnter={handlePlay}
            onMouseLeave={handlePauseAndReset}
            onTouchStart={handlePlay}
            onTouchEnd={handlePauseAndReset}
            onError={handleOnError}
            className="h-full w-full object-cover"
          />
        ) : (
          <img
            src={url}
            alt=""
            onError={handleOnError}
            className="h-full w-full object-cover"
          />
        )}
        {renderIcon({ isGallery, isVideo })}
      </div>
    </Link>
  );
}
