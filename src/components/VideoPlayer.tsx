// import React, { useEffect, useRef, useState } from "react";

// interface Props {
//   video: string | null;
// }
// function VideoPlayer({ video }: Props) {
//   const [currentVideo, setCurrentVideo] = useState<string | null>(video);
//   const [fade, setFade] = useState<boolean>(false);
//   const videoRef = useRef<HTMLVideoElement>(null);

//   useEffect(() => {
//     if (!video) {
//       return;
//     }
//     if (videoRef.current) {
//       setFade(true);
//       const timeout = setTimeout(() => {
//         setCurrentVideo(video);
//         setFade(false);
//         videoRef.current?.play();
//       }, 1000);
//       return () => clearTimeout(timeout);
//     }
//   }, [video]);

//   return (
//     <div className="fixed inset-0">
//       <video
//         ref={videoRef}
//         src={video || ""}
//         autoPlay
//         muted
//         loop
//         className={`object-cover w-full h-full transition-opacity duration-100 ${fade ? "opacity-0" : "opacity-100"}`}
//       ></video>
//     </div>
//   );
// }

// export default VideoPlayer;
import { useEffect, useRef, useState } from "react";

interface Props {
  video: string | null;
}

function VideoPlayer({ video }: Props) {
  const [currentVideo, setCurrentVideo] = useState<string | null>(video);
  const [fade, setFade] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!video || video === currentVideo) return;

    let cancelled = false;

    // Defer so the setState is NOT synchronous in the effect body
    const startFadeId = setTimeout(() => {
      if (!cancelled) setFade(true);
    }, 0);

    const swapId = setTimeout(() => {
      if (cancelled) return;
      setCurrentVideo(video);
      setFade(false);

      // ensure the new src is applied before we try to play
      requestAnimationFrame(() => {
        videoRef.current?.play().catch(() => {});
      });
    }, 1000);

    return () => {
      cancelled = true;
      clearTimeout(startFadeId);
      clearTimeout(swapId);
    };
  }, [video, currentVideo]);

  return (
    <div className="fixed inset-0 bg-radial from-purple-500 to-indigo-900">
      <video
        ref={videoRef}
        src={currentVideo || ""}
        autoPlay
        muted
        loop
        className={`object-cover w-full h-full transition-opacity duration-1000 ${
          fade ? "opacity-0" : "opacity-100"
        }`}
      />
    </div>
  );
}

export default VideoPlayer;
