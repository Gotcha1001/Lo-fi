// import music_icon from "../assets/icons/icon--music.png";
// import sliders_icon from "../assets/icons/icon--sliders.png";

// interface Props {
//   setShowMusicPanel: (show: boolean) => void;
//   showMusicPanel: boolean;
//   setShowSfxPanel: (show: boolean) => void;
//   showSfxPanel: boolean;
// }

// function SelectorButtons({
//   setShowMusicPanel,
//   showMusicPanel,
//   setShowSfxPanel,
//   showSfxPanel,
// }: Props) {
//   return (
//     <div className="absolute z-30 right-4 sm:right-8 top-1/2 translate-y-[-50%]">
//       <button
//         onClick={() => {
//           setShowMusicPanel(!showMusicPanel);
//           setShowSfxPanel(false);
//         }}
//         className="mb-4 h-10 sm:h-12 aspect-48/48 bg-black/40 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center shadow-md hover:scale-105 transition-transofrm ease-in-out duration-200"
//       >
//         <img src={music_icon} alt="Music" className="invert w-10" />
//       </button>
//       <button
//         onClick={() => {
//           setShowMusicPanel(!showSfxPanel);
//           setShowMusicPanel(false);
//         }}
//         className="mb-4 h-10 sm:h-12 aspect-48/48 bg-black/40 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center shadow-md hover:scale-105 transition-transofrm ease-in-out duration-200"
//       >
//         <img src={sliders_icon} alt="Slider" className="invert w-10" />
//       </button>
//     </div>
//   );
// }

// export default SelectorButtons;

import music_icon from "../assets/icons/icon--music.png";
import sliders_icon from "../assets/icons/icon--sliders.png";

interface Props {
  setShowMusicPanel: (show: boolean) => void;
  showMusicPanel: boolean;
  setShowSfxPanel: (show: boolean) => void;
  showSfxPanel: boolean;
}

function SelectorButtons({
  setShowMusicPanel,
  showMusicPanel,
  setShowSfxPanel,
  showSfxPanel,
}: Props) {
  return (
    <div
      className="absolute z-30 right-4 sm:right-8 top-1/2 translate-y-[-50%]"
      onPointerDown={(e) => {
        e.stopPropagation();
      }}
    >
      <button
        onClick={() => {
          setShowMusicPanel(!showMusicPanel);
          setShowSfxPanel(false);
        }}
        className="mb-4 h-10 sm:h-12 aspect-48/48 bg-black/40 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center shadow-md hover:scale-105 transition-transofrm ease-in-out duration-200"
      >
        <img src={music_icon} alt="Music" className="invert w-10" />
      </button>

      <button
        onClick={() => {
          setShowSfxPanel(!showSfxPanel);
          setShowMusicPanel(false);
        }}
        className="mb-4 h-10 sm:h-12 aspect-48/48 bg-black/40 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center shadow-md hover:scale-105 transition-transofrm ease-in-out duration-200"
      >
        <img src={sliders_icon} alt="Slider" className="invert w-10" />
      </button>
    </div>
  );
}

export default SelectorButtons;
