// import React, { useEffect, useRef, useState } from "react";
// import type { Song } from "../types/types";
// import prev from "../assets/icons/icon--next.png";
// import play from "../assets/icons/icon--play.png";
// import pause from "../assets/icons/icon--pause.png";
// import next from "../assets/icons/icon--next.png";
// import musicCategories from "../data/musicCategories";
// import VolumeControl from "./VolumeControl";

// interface Props {
//   activeMusicCategory: number;
//   currentTrack: Song | null;
//   songIndex: number;
//   setSongIndex: React.Dispatch<React.SetStateAction<number>>;
//   setCurrentTrack: React.Dispatch<React.SetStateAction<Song | null>>;
// }

// function PlayerControls({
//   activeMusicCategory,
//   currentTrack,
//   songIndex,
//   setSongIndex,
//   setCurrentTrack,
// }: Props) {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [volume, setVolume] = useState<number>(20);
//   const [isMuted, setIsMuted] = useState<boolean>(false);

//   const audioRef = useRef<HTMLAudioElement>(null);

//   useEffect(() => {
//     if (isPlaying) {
//       audioRef.current?.play();
//     } else {
//       audioRef.current?.pause();
//     }
//   }, [isPlaying, currentTrack]);

//   // Keep current track in sync with song index and active music category
//   useEffect(() => {
//     setCurrentTrack(musicCategories[activeMusicCategory].music[songIndex]);
//   }, [songIndex, activeMusicCategory]);

//   useEffect(() => {
//     const audio = audioRef.current;

//     if (!audio) return;

//     const nextSong = () => {
//       setSongIndex((prevIndex) => {
//         const nextIndex =
//           prevIndex < musicCategories[activeMusicCategory].music.length - 1
//             ? prevIndex + 1
//             : 0;

//         setIsPlaying(true);
//         return nextIndex;
//       });
//     };

//     const handleEnded = () => {
//       // next song
//       nextSong();
//     };

//     return () => {
//       audio.addEventListener("ended", handleEnded);
//     };
//   }, [activeMusicCategory]);

//   const prevSong = () => {
//     setSongIndex((prevIndex) =>
//       prevIndex > 1
//         ? prevIndex - 1
//         : musicCategories[activeMusicCategory].music.length - 1,
//     );
//   };

//   return (
//     <div className="flex items-center justify-center gap-4 sm:gap-8 flex-wrap">
//       <button
//         className="rotate-180 w-10 sm:w-11.5 hover:scale-105 transition-transform ease-in-out duration-200"
//         onClick={prevSong}
//       >
//         <img className="invert" src={prev} alt="Previous" />
//       </button>
//       <button
//         onClick={() => setIsPlaying(!isPlaying)}
//         className="w-12 sm:w-15 hover:scale-105 transition-transform ease-in-out duration-200"
//       >
//         <img
//           src={isPlaying ? pause : play}
//           className="invert"
//           alt={isPlaying ? "Pause" : "Play"}
//         />
//       </button>

//       <button
//         className="w-10 sm:w-11.5 hover:scale-105 transition-transform ease-in-out duration-200"
//         onClick={nextSong}
//       >
//         <img className="invert" src={next} alt="Next Button" />
//       </button>

//       <VolumeControl
//         volume={volume}
//         isMuted={isMuted}
//         onVolumeChange={setVolume}
//         onToggleMute={() => setIsMuted((prev) => !prev)}
//       />

//       <audio ref={audioRef} src={currentTrack?.src || ""} autoPlay />
//     </div>
//   );
// }

// export default PlayerControls;

import React, { useEffect, useRef, useState } from "react";
import type { Song } from "../types/types";
import prev from "../assets/icons/icon--next.png";
import play from "../assets/icons/icon--play.png";
import pause from "../assets/icons/icon--pause.png";
import next from "../assets/icons/icon--next.png";
import musicCategories from "../data/musicCategories";
import VolumeControl from "./VolumeControl";

interface Props {
  activeMusicCategory: number;
  currentTrack: Song | null;
  songIndex: number;
  setSongIndex: React.Dispatch<React.SetStateAction<number>>;
  setCurrentTrack: React.Dispatch<React.SetStateAction<Song | null>>;
}

function PlayerControls({
  activeMusicCategory,
  currentTrack,
  songIndex,
  setSongIndex,
  setCurrentTrack,
}: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState<number>(20);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  // Keep current track in sync with song index and active music category
  useEffect(() => {
    setCurrentTrack(musicCategories[activeMusicCategory].music[songIndex]);
  }, [songIndex, activeMusicCategory, setCurrentTrack]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = isMuted ? 0 : volume / 100;
  }, [volume, isMuted]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying, currentTrack]);

  const nextSong = () => {
    setSongIndex((prevIndex) => {
      const tracks = musicCategories[activeMusicCategory].music;
      const nextIndex = prevIndex < tracks.length - 1 ? prevIndex + 1 : 0;

      setIsPlaying(true);
      return nextIndex;
    });
  };

  const prevSong = () => {
    setSongIndex((prevIndex) => {
      const tracks = musicCategories[activeMusicCategory].music;
      return prevIndex > 0 ? prevIndex - 1 : tracks.length - 1;
    });
  };

  // Auto-advance when a track ends
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      nextSong();
    };

    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, [activeMusicCategory]); // nextSong is stable enough for this use-case

  return (
    <div className="flex items-center justify-center gap-4 sm:gap-8 flex-wrap">
      <button
        className="rotate-180 w-10 sm:w-11.5 hover:scale-105 transition-transform ease-in-out duration-200"
        onClick={prevSong}
      >
        <img className="invert" src={prev} alt="Previous" />
      </button>

      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="w-12 sm:w-15 hover:scale-105 transition-transform ease-in-out duration-200"
      >
        <img
          src={isPlaying ? pause : play}
          className="invert"
          alt={isPlaying ? "Pause" : "Play"}
        />
      </button>

      <button
        className="w-10 sm:w-11.5 hover:scale-105 transition-transform ease-in-out duration-200"
        onClick={nextSong}
      >
        <img className="invert" src={next} alt="Next Button" />
      </button>

      <VolumeControl
        volume={volume}
        isMuted={isMuted}
        onVolumeChange={setVolume}
        onToggleMute={() => setIsMuted((prev) => !prev)}
      />

      <audio ref={audioRef} src={currentTrack?.src || ""} autoPlay />
    </div>
  );
}

export default PlayerControls;
