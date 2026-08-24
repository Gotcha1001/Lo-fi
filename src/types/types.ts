type Song = {
  id: string;
  title: string;
  artist: string;
  src: string;
};

type VideoCategory = {
  id: string;
  category: string;
  videos: string[];
  icon: string;
};

type SoundEffect = {
  id: string;
  name: string;
  src: string;
};

type MusicCategory = {
  id: string;
  category: string;
  music: Song[];
  cover: string;
};

export type { Song, MusicCategory, VideoCategory, SoundEffect };
