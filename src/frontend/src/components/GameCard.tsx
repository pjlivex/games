import { Badge } from "@/components/ui/badge";
import { Link } from "@tanstack/react-router";
import { Play, Star } from "lucide-react";
import type { Game } from "../types/game";

interface GameCardProps {
  game: Game;
  index?: number;
}

const GRADIENT_OVERLAYS = [
  "from-primary/80 to-accent/80",
  "from-purple-600/80 to-pink-500/80",
  "from-orange-500/80 to-yellow-400/80",
  "from-teal-500/80 to-cyan-400/80",
  "from-rose-500/80 to-pink-400/80",
  "from-violet-600/80 to-indigo-500/80",
];

export function GameCard({ game, index = 0 }: GameCardProps) {
  const gradientClass = GRADIENT_OVERLAYS[index % GRADIENT_OVERLAYS.length];

  return (
    <Link
      to="/game/$gameId"
      params={{ gameId: game.id }}
      className="group block rounded-2xl overflow-hidden hover-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      data-ocid={`game.item.${index + 1}`}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video bg-muted overflow-hidden">
        <img
          src={game.thumbnail}
          alt={game.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            const target = e.currentTarget;
            target.style.display = "none";
            const parent = target.parentElement;
            if (parent && !parent.querySelector(".fallback-bg")) {
              const fallback = document.createElement("div");
              fallback.className = `fallback-bg absolute inset-0 bg-gradient-to-br ${gradientClass.replace("/80", "")} flex items-center justify-center`;
              fallback.innerHTML = `<span class="text-5xl">${getCategoryEmoji(game.category)}</span>`;
              parent.appendChild(fallback);
            }
          }}
        />

        {/* Hover overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-t ${gradientClass} opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center`}
        >
          <div className="flex flex-col items-center gap-2 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white flex items-center justify-center">
              <Play className="w-7 h-7 text-white fill-white ml-1" />
            </div>
            <span className="text-white font-display font-bold text-sm tracking-wide">
              PLAY NOW
            </span>
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-2 left-2 flex gap-1">
          {game.isNew && (
            <span className="px-2 py-0.5 rounded-full bg-accent text-accent-foreground text-xs font-bold uppercase tracking-wide shadow-sm">
              NEW
            </span>
          )}
          {game.isFeatured && (
            <span className="px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wide shadow-sm">
              HOT
            </span>
          )}
        </div>
      </div>

      {/* Card body */}
      <div className="bg-card px-3 pt-2.5 pb-3 border border-t-0 border-border rounded-b-2xl">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display font-bold text-foreground text-sm leading-tight line-clamp-1 flex-1">
            {game.title}
          </h3>
          <div className="flex items-center gap-0.5 shrink-0">
            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-semibold text-foreground">
              {game.rating.toFixed(1)}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-1.5">
          <Badge
            variant="secondary"
            className="text-xs px-2 py-0 h-5 rounded-full font-medium bg-primary/10 text-primary hover:bg-primary/15 border-0"
          >
            {game.category}
          </Badge>
          <span className="text-xs text-muted-foreground truncate">
            {formatPlayCount(game.playCount)} plays
          </span>
        </div>
      </div>
    </Link>
  );
}

function formatPlayCount(count: bigint): string {
  const n = Number(count);
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return String(n);
}

function getCategoryEmoji(category: string): string {
  const map: Record<string, string> = {
    Action: "⚔️",
    Puzzle: "🧩",
    Racing: "🏎️",
    Sports: "⚽",
    Adventure: "🗺️",
    Casual: "🎯",
    Multiplayer: "👥",
    Girls: "💖",
  };
  return map[category] ?? "🎮";
}
