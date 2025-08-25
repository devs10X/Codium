// components/LoopVideo.tsx
import { useEffect, useRef } from "react";

const LoopVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Try to autoplay
    video.play().catch((err) => {
      console.log("Autoplay blocked. Video must be muted.", err);
    });

    // Loop manually for smooth playback
    const handleEnded = () => {
      video.currentTime = 0;
      video.play();
    };

    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      width={"60%"}
      autoPlay
      muted
      preload="auto"
    >
      <source src="/Codium-MVP.mp4" type="video/mp4" />
      <track
        src="/path/to/captions.vtt"
        kind="subtitles"
        srcLang="en"
        label="English"
      />
      Your browser does not support the video tag.
    </video>
  );
};

export default LoopVideo;
