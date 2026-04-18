import { Skeleton } from "@/components/ui/skeleton";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, Gamepad2 } from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { AdSense } from "../components/AdSense";
import { GameCard } from "../components/GameCard";
import { Layout } from "../components/Layout";
import { useGamesByCategory } from "../hooks/useGames";
import { CATEGORIES, CATEGORY_COLORS, CATEGORY_ICONS } from "../types/game";
import type { Game } from "../types/game";

const CATEGORY_GRADIENTS: Record<string, string> = {
  Action: "from-red-600 via-orange-500 to-yellow-400",
  Puzzle: "from-blue-600 via-indigo-500 to-purple-500",
  Racing: "from-orange-500 via-amber-400 to-yellow-300",
  Sports: "from-green-500 via-emerald-400 to-teal-400",
  Adventure: "from-yellow-500 via-lime-400 to-green-400",
  Casual: "from-purple-600 via-violet-500 to-indigo-400",
  Multiplayer: "from-pink-600 via-rose-500 to-red-400",
  Girls: "from-rose-500 via-pink-400 to-fuchsia-400",
};

const CATEGORY_ACCENT_BG: Record<string, string> = {
  Action: "bg-red-500/20",
  Puzzle: "bg-blue-500/20",
  Racing: "bg-orange-500/20",
  Sports: "bg-green-500/20",
  Adventure: "bg-yellow-500/20",
  Casual: "bg-purple-500/20",
  Multiplayer: "bg-pink-500/20",
  Girls: "bg-rose-500/20",
};

type SortKey = "popular" | "new" | "rating";

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: "popular", label: "🔥 Popular" },
  { key: "new", label: "✨ New" },
  { key: "rating", label: "⭐ Rating" },
];

function sortGames(games: Game[], sort: SortKey): Game[] {
  const copy = [...games];
  if (sort === "popular")
    return copy.sort((a, b) => Number(b.playCount) - Number(a.playCount));
  if (sort === "new")
    return copy.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
  if (sort === "rating") return copy.sort((a, b) => b.rating - a.rating);
  return copy;
}

export default function CategoryPage() {
  const { categoryName } = useParams({ from: "/category/$categoryName" });
  const [sort, setSort] = useState<SortKey>("popular");

  const { data: games = [], isLoading } = useGamesByCategory(categoryName);
  const sortedGames = useMemo(() => sortGames(games, sort), [games, sort]);

  const gradient =
    CATEGORY_GRADIENTS[categoryName] ?? "from-primary via-accent to-primary";
  const accentBg = CATEGORY_ACCENT_BG[categoryName] ?? "bg-primary/20";
  const icon = CATEGORY_ICONS[categoryName] ?? "🎮";
  const otherCategories = CATEGORIES.filter((c) => c !== categoryName);

  return (
    <Layout>
      {/* ── Category Hero Banner ── */}
      <div
        className={`relative overflow-hidden bg-gradient-to-r ${gradient}`}
        data-ocid="category.header.section"
      >
        {/* Decorative blobs */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute -top-8 -right-8 w-48 h-48 rounded-full bg-white/30 blur-3xl" />
          <div className="absolute bottom-0 left-12 w-32 h-32 rounded-full bg-white/20 blur-2xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium mb-5 transition-colors duration-200"
            data-ocid="category.all_games_link"
          >
            <ArrowLeft className="w-4 h-4" />
            All Games
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="flex items-center gap-3 mb-2"
              >
                <span className="text-5xl sm:text-6xl drop-shadow-lg">
                  {icon}
                </span>
                <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-white drop-shadow-md leading-tight">
                  {categoryName}
                </h1>
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="text-white/80 text-lg font-body"
              >
                Play {categoryName} games for free!
              </motion.p>
            </div>

            {/* Game count badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="self-start sm:self-center flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 shadow-lg"
              data-ocid="category.game_count_badge"
            >
              <Gamepad2 className="w-5 h-5 text-white" />
              <span className="text-white font-display font-bold text-lg">
                {isLoading ? "…" : sortedGames.length} Games
              </span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Ad ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-5">
        <AdSense slot="content" className="w-full" />
      </div>

      {/* ── Filter / Sort Bar ── */}
      <div className="sticky top-0 z-10 bg-card/90 backdrop-blur-md border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4 flex-wrap">
          <p className="text-sm text-muted-foreground hidden sm:block">
            {isLoading ? "Loading…" : `${sortedGames.length} games found`}
          </p>
          <div
            className="flex items-center gap-2 flex-wrap"
            aria-label="Sort games"
          >
            <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide mr-1">
              Sort:
            </span>
            {SORT_OPTIONS.map(({ key, label }) => (
              <button
                key={key}
                type="button"
                onClick={() => setSort(key)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-smooth border ${
                  sort === key
                    ? `bg-gradient-to-r ${gradient} text-white border-transparent shadow-md`
                    : "bg-muted text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
                }`}
                data-ocid={`category.sort.${key}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Games Grid ── */}
      <main
        className="max-w-7xl mx-auto px-4 sm:px-6 py-8"
        data-ocid="category.page"
      >
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {Array.from({ length: 12 }, (_, i) => `sk-${i}`).map((key) => (
              <div
                key={key}
                className="rounded-2xl overflow-hidden"
                data-ocid="category.loading_state"
              >
                <Skeleton className="aspect-video w-full" />
                <div className="bg-card border border-t-0 border-border rounded-b-2xl p-3 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : sortedGames.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-24 gap-5"
            data-ocid="category.empty_state"
          >
            <div
              className={`w-24 h-24 rounded-3xl ${accentBg} flex items-center justify-center text-5xl`}
            >
              {icon}
            </div>
            <div className="text-center">
              <h3 className="font-display font-bold text-xl text-foreground mb-1">
                No {categoryName} games yet
              </h3>
              <p className="text-muted-foreground text-sm mb-6">
                More games are coming soon. Check back later!
              </p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold text-white bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
                data-ocid="category.empty_home_button"
              >
                <ArrowLeft className="w-4 h-4" />
                Browse All Games
              </Link>
            </div>
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.05 } },
              hidden: {},
            }}
            data-ocid="category.games.list"
          >
            {sortedGames.map((game, index) => (
              <motion.div
                key={game.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.35 },
                  },
                }}
              >
                <GameCard game={game} index={index} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </main>

      {/* ── Explore More Categories ── */}
      <section className="bg-muted/40 border-t border-border mt-6 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display font-bold text-2xl text-foreground mb-5"
          >
            🌟 Explore More Categories
          </motion.h2>

          <div
            className="flex flex-wrap gap-3"
            data-ocid="category.other_categories"
          >
            {otherCategories.map((cat, i) => {
              const catGradient =
                CATEGORY_GRADIENTS[cat] ?? "from-primary to-accent";
              const catIcon = CATEGORY_ICONS[cat] ?? "🎮";
              const catColorClass = CATEGORY_COLORS[cat] ?? "bg-primary";
              return (
                <motion.div
                  key={cat}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    to="/category/$categoryName"
                    params={{ categoryName: cat }}
                    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-display font-bold text-sm text-white bg-gradient-to-r ${catGradient} shadow-md hover-lift hover:shadow-lg transition-smooth border border-white/20`}
                    data-ocid={`category.other.${cat.toLowerCase()}`}
                    aria-label={`Browse ${cat} games`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${catColorClass} opacity-80 shrink-0`}
                    />
                    <span className="text-base">{catIcon}</span>
                    {cat}
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
}
