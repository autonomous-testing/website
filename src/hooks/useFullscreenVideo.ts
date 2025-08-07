import { useState } from "react";

export function useFullscreenVideo() {
  const [fullscreenVideo, setFullscreenVideo] = useState<string | null>(null);

  const openFullscreen = (videoSrc: string) => {
    setFullscreenVideo(videoSrc);
  };

  const closeFullscreen = () => {
    setFullscreenVideo(null);
  };

  return {
    fullscreenVideo,
    openFullscreen,
    closeFullscreen,
    isFullscreenOpen: fullscreenVideo !== null,
  };
}
