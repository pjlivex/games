export interface Game {
  id: string;
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  embedUrl: string;
  tags: string[];
  isNew: boolean;
  isFeatured: boolean;
  rating: number;
  playCount: bigint;
}

export const CATEGORIES = [
  "Action",
  "Puzzle",
  "Racing",
  "Sports",
  "Adventure",
  "Casual",
  "Multiplayer",
  "Girls",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_ICONS: Record<string, string> = {
  Action: "⚔️",
  Puzzle: "🧩",
  Racing: "🏎️",
  Sports: "⚽",
  Adventure: "🗺️",
  Casual: "🎯",
  Multiplayer: "👥",
  Girls: "💖",
};

export const CATEGORY_COLORS: Record<string, string> = {
  Action: "bg-red-500",
  Puzzle: "bg-blue-500",
  Racing: "bg-orange-500",
  Sports: "bg-green-500",
  Adventure: "bg-yellow-500",
  Casual: "bg-purple-500",
  Multiplayer: "bg-pink-500",
  Girls: "bg-rose-500",
};
