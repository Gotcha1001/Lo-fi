import { useRef } from "react";
import musicCategories from "../data/musicCategories";
import useClickOutside from "../hooks/useClickOutside";

interface Props {
  showMusicPanel: boolean;

  activeMusicCategory: number;
  setActiveMusicCategory: (category: number) => void;
  songIndex: number;
  setSongIndex: (index: number) => void;
  setShowMusicPanel: (show: boolean) => void;
}

function MusicPanel({
  showMusicPanel,
  activeMusicCategory,
  setActiveMusicCategory,
  songIndex,
  setSongIndex,
  setShowMusicPanel,
}: Props) {
  const panelRef = useRef<HTMLDivElement>(null);

  useClickOutside(panelRef, setShowMusicPanel, showMusicPanel);

  return (
    <div
      ref={panelRef}
      className={`custom-scrollbar w-75 sm:w-107.5 h-125 bg-black/40 absolute z-50 top-1/2 right-18 sm:right-24 transform -translate-y-1/2 transition-transform duration-300 rounded-lg border border-white/40 shadow-sm overflow-auto ${showMusicPanel ? "translate-x-0 opacity-100" : "translate-x-[135%] opacity-0"}`}
    >
      <div className="p-3 grid grid-cols-2 gap-2 overflow-y-auto text-white">
        {musicCategories.map((cat, index: number) => {
          return (
            <div
              key={cat.id}
              className={`p-1 flex items-center gap-2 cursor-pointer rounded-md ${activeMusicCategory === index ? "opacity-100 bg/white/15 ring-1 ring-white/30" : "opacity-80"}`}
              onClick={() => {
                setActiveMusicCategory(index);
                setSongIndex(0);
              }}
            >
              <img
                src={cat.cover}
                alt={cat.category}
                className="sm:w-17.5 sm:h-17.5 w-11.5 h-11.5 rounded-md object-cover"
              />
              <h2 className="font-semibold text-base sm:text-lg">
                {cat.category}
              </h2>
            </div>
          );
        })}
      </div>
      <div className="border-t-2 border-white/20">
        {activeMusicCategory !== null && (
          <div className="p-3 flex flex-col gap-2">
            {musicCategories[activeMusicCategory].music.map((song, index) => {
              const isSelected = songIndex === index;

              return (
                <button
                  key={song.id}
                  className={`px-1 py-2 w-full flex items-center gap-2 rounded-md
        ${
          isSelected
            ? "bg-radial from-purple-500 to-indigo-900 text-white ring-1 ring-white/30 opacity-100"
            : "opacity-80 text-white"
        }`}
                  onClick={() => setSongIndex(index)}
                >
                  <span className="font-semibold text-sm sm:text-base">
                    {song.title}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default MusicPanel;
