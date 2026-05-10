export interface NowPlaying {
  isPlaying: boolean;
  title: string;
  artist: string;
  album?: string;
  artworkUrl?: string;
  spotifyUrl: string;
  appleMusicUrl?: string;
  youtubeUrl?: string;
}
