import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowLeft,
  Gamepad2,
  Maximize2,
  Minimize2,
  Share2,
  Star,
} from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useRef, useState } from "react";
import { AdSense } from "../components/AdSense";
import { GameCard } from "../components/GameCard";
import { Layout } from "../components/Layout";
import { useGameById, useGamesByCategory } from "../hooks/useGames";

// ── Constants ─────────────────────────────────────────────

const CATEGORY_GRADIENTS: Record<string, string> = {
  Action: "from-red-500 to-orange-500",
  Puzzle: "from-blue-500 to-cyan-400",
  Racing: "from-orange-500 to-yellow-400",
  Sports: "from-green-500 to-emerald-400",
  Adventure: "from-yellow-500 to-amber-400",
  Casual: "from-purple-500 to-violet-400",
  Multiplayer: "from-pink-500 to-rose-400",
  Girls: "from-rose-400 to-pink-300",
};

const CATEGORY_BADGE: Record<string, string> = {
  Action: "bg-red-500/15 text-red-400 border-red-500/30",
  Puzzle: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  Racing: "bg-orange-500/15 text-orange-400 border-orange-500/30",
  Sports: "bg-green-500/15 text-green-400 border-green-500/30",
  Adventure: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  Casual: "bg-purple-500/15 text-purple-400 border-purple-500/30",
  Multiplayer: "bg-pink-500/15 text-pink-400 border-pink-500/30",
  Girls: "bg-rose-500/15 text-rose-400 border-rose-500/30",
};

const TAG_PALETTE = [
  "bg-primary/10 text-primary border-primary/20",
  "bg-accent/10 text-accent border-accent/20",
  "bg-purple-500/10 text-purple-400 border-purple-500/20",
  "bg-orange-500/10 text-orange-400 border-orange-500/20",
  "bg-teal-500/10 text-teal-400 border-teal-500/20",
];

// ── Helpers ───────────────────────────────────────────────

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

// ── StarRating ────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.5;
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => {
        const key = `star-${i}`;
        if (i < full)
          return (
            <Star
              key={key}
              className="w-4 h-4 fill-yellow-400 text-yellow-400"
            />
          );
        if (i === full && hasHalf) {
          return (
            <span key={key} className="relative inline-block w-4 h-4">
              <Star className="absolute w-4 h-4 text-muted/40" />
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: "50%" }}
              >
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              </span>
            </span>
          );
        }
        return <Star key={key} className="w-4 h-4 text-muted-foreground/30" />;
      })}
      <span className="ml-1.5 text-sm font-bold text-foreground">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

// ── GamePage ──────────────────────────────────────────────

export default function GamePage() {
  const { gameId } = useParams({ from: "/game/$gameId" });
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const { data: game, isLoading, isError } = useGameById(gameId);
  const { data: related = [] } = useGamesByCategory(game?.category ?? "");
  const relatedGames = related.filter((g) => g.id !== gameId).slice(0, 8);

  const toggleFullscreen = useCallback(async () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      await containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      await document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  const handleShare = useCallback(() => {
    if (navigator.share) {
      navigator.share({
        title: game?.title ?? "Game",
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  }, [game?.title]);

  // ── Loading ──
  if (isLoading) {
    return (
      <Layout hideSidebar>
        <div
          className="max-w-5xl mx-auto px-4 py-6 space-y-6"
          data-ocid="game.loading_state"
        >
          <Skeleton
            className="w-full rounded-2xl"
            style={{ aspectRatio: "16/9", minHeight: 480 }}
          />
          <div className="space-y-3">
            <Skeleton className="h-10 w-2/3 rounded-xl" />
            <Skeleton className="h-5 w-1/3 rounded-lg" />
            <Skeleton className="h-20 w-full rounded-xl" />
          </div>
        </div>
      </Layout>
    );
  }

  // ── Error ──
  if (isError || !game) {
    return (
      <Layout hideSidebar>
        <div
          className="max-w-5xl mx-auto px-4 py-24 flex flex-col items-center gap-6 text-center"
          data-ocid="game.error_state"
        >
          <div className="w-24 h-24 rounded-full bg-destructive/10 flex items-center justify-center">
            <AlertCircle className="w-12 h-12 text-destructive" />
          </div>
          <div>
            <h2 className="font-display text-3xl font-black text-foreground mb-2">
              Game Not Found
            </h2>
            <p className="text-muted-foreground max-w-md">
              This game doesn't exist or has been removed. Try browsing other
              games!
            </p>
          </div>
          <Button
            onClick={() => navigate({ to: "/" })}
            className="gradient-primary text-white font-bold px-8 rounded-xl shadow-elevated hover-lift"
            data-ocid="game.back_home_button"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </Layout>
    );
  }

  const catGradient =
    CATEGORY_GRADIENTS[game.category] ?? "from-primary to-accent";
  const catBadge =
    CATEGORY_BADGE[game.category] ??
    "bg-primary/15 text-primary border-primary/30";

  return (
    <Layout hideSidebar>
      <div
        className="max-w-5xl mx-auto px-4 py-4 space-y-6"
        data-ocid="game.page"
      >
        {/* Breadcrumb */}
        <nav
          className="flex items-center gap-1.5 text-sm text-muted-foreground"
          data-ocid="game.breadcrumb"
        >
          <Link
            to="/"
            className="hover:text-primary transition-smooth flex items-center gap-1 font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Home
          </Link>
          <span className="text-border">/</span>
          <Link
            to="/category/$categoryName"
            params={{ categoryName: game.category }}
            className="hover:text-primary transition-smooth font-medium"
          >
            {game.category}
          </Link>
          <span className="text-border">/</span>
          <span className="text-foreground font-semibold truncate max-w-[200px]">
            {game.title}
          </span>
        </nav>

        {/* AdSense — Top */}
        <AdSense slot="game-top" className="w-full" />

        {/* ── Game Embed ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div
            ref={containerRef}
            className="relative w-full rounded-2xl overflow-hidden shadow-elevated bg-black"
            style={{ aspectRatio: "16/9", minHeight: 480 }}
            data-ocid="game.canvas_target"
          >
            {/* Top dark gradient overlay with controls */}
            <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/75 to-transparent z-20 flex items-center justify-between px-4">
              <div className="flex items-center gap-2 pointer-events-none">
                {game.isNew && (
                  <span className="px-2 py-0.5 rounded-full bg-accent text-accent-foreground text-xs font-bold uppercase">
                    NEW
                  </span>
                )}
                <span className="font-display font-bold text-white text-sm drop-shadow-md truncate max-w-[240px]">
                  {game.title}
                </span>
              </div>
              <div className="flex items-center gap-2 pointer-events-auto">
                <button
                  type="button"
                  onClick={handleShare}
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/25 border border-white/20 backdrop-blur-sm flex items-center justify-center transition-smooth text-white"
                  aria-label="Share game"
                  data-ocid="game.secondary_button"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={toggleFullscreen}
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/25 border border-white/20 backdrop-blur-sm flex items-center justify-center transition-smooth text-white"
                  aria-label={
                    isFullscreen ? "Exit fullscreen" : "Enter fullscreen"
                  }
                  data-ocid="game.toggle"
                >
                  {isFullscreen ? (
                    <Minimize2 className="w-4 h-4" />
                  ) : (
                    <Maximize2 className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Iframe loading spinner */}
            {!iframeLoaded && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-card gap-4">
                <div className="relative w-16 h-16">
                  <div
                    className={`absolute inset-0 rounded-full bg-gradient-to-br ${catGradient} opacity-20 animate-ping`}
                  />
                  <div
                    className={`absolute inset-0 rounded-full border-4 border-transparent bg-gradient-to-br ${catGradient}`}
                    style={{
                      WebkitMask:
                        "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      WebkitMaskComposite: "xor",
                      maskComposite: "exclude",
                      animation: "spin 0.9s linear infinite",
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Gamepad2 className="w-7 h-7 text-primary" />
                  </div>
                </div>
                <p className="font-display font-semibold text-muted-foreground text-sm animate-pulse">
                  Loading game…
                </p>
              </div>
            )}

            <iframe
              src={game.embedUrl}
              title={game.title}
              className="absolute inset-0 w-full h-full border-0"
              sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-forms allow-modals allow-pointer-lock"
              allow="autoplay; fullscreen; gamepad"
              onLoad={() => setIframeLoaded(true)}
            />
          </div>
        </motion.div>

        {/* ── Game Info ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="bg-card rounded-2xl border border-border p-5 md:p-6 space-y-4"
          data-ocid="game.panel"
        >
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              {/* Title with gradient */}
              <h1 className="font-display text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-primary via-accent to-purple-400 bg-clip-text text-transparent leading-tight">
                {game.title}
              </h1>

              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-3 mt-3">
                <Badge
                  variant="outline"
                  className={`${catBadge} border font-bold text-sm px-3 py-1 rounded-full`}
                  data-ocid="game.tab"
                >
                  <span className="mr-1">
                    {getCategoryEmoji(game.category)}
                  </span>
                  {game.category}
                </Badge>
                <StarRating rating={game.rating} />
                <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
                  <Gamepad2 className="w-4 h-4 text-accent shrink-0" />
                  <span className="font-bold text-foreground">
                    {formatPlayCount(game.playCount)}
                  </span>
                  <span>plays</span>
                </div>
              </div>
            </div>

            <Button
              onClick={() => navigate({ to: "/" })}
              variant="outline"
              className="shrink-0 rounded-xl border-border hover:bg-muted font-semibold transition-smooth"
              data-ocid="game.back_home_button"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              All Games
            </Button>
          </div>

          {/* Tags */}
          {game.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {game.tags.map((tag, i) => (
                <span
                  key={tag}
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${TAG_PALETTE[i % TAG_PALETTE.length]}`}
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Description */}
          <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
            {game.description}
          </p>

          {/* AdSense — Bottom */}
          <AdSense slot="game-bottom" className="w-full mt-2" />
        </motion.div>

        {/* ── Related Games ── */}
        {relatedGames.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="pb-8"
            data-ocid="game.section"
          >
            <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <div
                  className={`w-1.5 h-8 rounded-full bg-gradient-to-b ${catGradient} shrink-0`}
                />
                <h2 className="font-display text-2xl font-extrabold text-foreground">
                  More {game.category} Games
                </h2>
              </div>
              <Link
                to="/category/$categoryName"
                params={{ categoryName: game.category }}
                className="text-sm font-semibold text-primary hover:underline transition-smooth"
                data-ocid="game.link"
              >
                See all →
              </Link>
            </div>

            <div
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
              data-ocid="game.list"
            >
              {relatedGames.map((rel, i) => (
                <motion.div
                  key={rel.id}
                  initial={{ opacity: 0, scale: 0.93 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.28, delay: i * 0.06 }}
                >
                  <GameCard game={rel} index={i} />
                </motion.div>
              ))}
            </div>

            <div className="flex justify-center mt-8">
              <Button
                onClick={() =>
                  navigate({
                    to: "/category/$categoryName",
                    params: { categoryName: game.category },
                  })
                }
                className="gradient-primary text-white font-bold px-8 rounded-xl shadow-elevated hover-lift transition-smooth"
                data-ocid="game.primary_button"
              >
                View All {game.category} Games
              </Button>
            </div>
          </motion.section>
        )}
      </div>
    </Layout>
  );
}
