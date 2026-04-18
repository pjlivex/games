import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Gamepad2, Search, Sparkles, X, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { AdSense } from "../components/AdSense";
import { GameCard } from "../components/GameCard";
import { Layout } from "../components/Layout";
import {
  useAllGames,
  useFeaturedGames,
  useSearchGames,
} from "../hooks/useGames";
import { CATEGORIES, CATEGORY_ICONS } from "../types/game";

const CATEGORY_GRADIENTS: Record<string, string> = {
  Action: "from-red-500 to-orange-400",
  Puzzle: "from-blue-500 to-indigo-400",
  Racing: "from-orange-500 to-yellow-400",
  Sports: "from-green-500 to-emerald-400",
  Adventure: "from-yellow-500 to-amber-400",
  Casual: "from-purple-500 to-violet-400",
  Multiplayer: "from-pink-500 to-rose-400",
  Girls: "from-rose-400 to-pink-300",
};

const SUGGESTION_TAGS = [
  "racing",
  "puzzle",
  "adventure",
  "multiplayer",
  "action",
  "sports",
  "casual",
  "ninja",
  "shooting",
  "zombie",
];

export default function SearchPage() {
  const rawParams = useSearch({ from: "/search" }) as { q?: string };
  const initialQuery = rawParams.q ?? "";
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync URL param → input when navigating from outside
  useEffect(() => {
    setInputValue(initialQuery);
    setDebouncedQuery(initialQuery);
  }, [initialQuery]);

  // Debounce input → update URL
  useEffect(() => {
    const timeout = setTimeout(() => {
      const trimmed = inputValue.trim();
      setDebouncedQuery(trimmed);
      void navigate({
        to: "/search",
        search: { q: trimmed || "" },
        replace: true,
      });
    }, 300);
    return () => clearTimeout(timeout);
  }, [inputValue, navigate]);

  const { data: searchResults, isLoading: isSearching } =
    useSearchGames(debouncedQuery);
  const { data: allGames, isLoading: loadingAll } = useAllGames();
  const { data: featuredGames, isLoading: loadingFeatured } =
    useFeaturedGames();

  const hasQuery = debouncedQuery.trim().length > 0;
  const results = hasQuery ? (searchResults ?? []) : (allGames ?? []);
  const isLoading = hasQuery ? isSearching : loadingAll;

  function handleClear() {
    setInputValue("");
    setDebouncedQuery("");
    void navigate({ to: "/search", search: { q: "" }, replace: true });
    inputRef.current?.focus();
  }

  function handleCategoryClick(cat: string) {
    setInputValue(cat);
    inputRef.current?.focus();
  }

  function handleTagClick(tag: string) {
    setInputValue(tag);
    inputRef.current?.focus();
  }

  return (
    <Layout>
      <div data-ocid="search.page" className="flex flex-col min-h-full">
        {/* ═══ SEARCH HERO ═══ */}
        <section className="relative overflow-hidden gradient-primary py-10 px-4">
          {/* Decorative blobs */}
          <div className="absolute inset-0 pointer-events-none select-none">
            <div className="absolute -top-8 -left-8 w-40 h-40 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-8 right-16 w-56 h-56 rounded-full bg-white/10 blur-3xl" />
          </div>

          <div className="relative max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <p className="inline-flex items-center gap-1.5 text-white/80 text-sm font-semibold uppercase tracking-widest mb-3">
                <Sparkles className="w-4 h-4" />
                Game Search
              </p>
              <h1 className="font-display font-black text-3xl md:text-4xl text-white mb-6 leading-tight">
                {hasQuery ? (
                  <>
                    Results for{" "}
                    <span className="text-white underline decoration-wavy decoration-white/40 underline-offset-4">
                      "{debouncedQuery}"
                    </span>
                  </>
                ) : (
                  "Find Your Next Favourite Game"
                )}
              </h1>
            </motion.div>

            {/* Search input */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, delay: 0.1 }}
              className="relative"
            >
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/50 pointer-events-none z-10" />
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Search games by name, genre, or tag…"
                className="pl-13 pr-14 h-14 text-base md:text-lg rounded-2xl bg-card border-0 shadow-xl shadow-black/20 focus:ring-2 focus:ring-white/40 font-body placeholder:text-muted-foreground"
                data-ocid="search.search_input"
                autoFocus
                aria-label="Search games"
              />
              {inputValue && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-muted/60 hover:bg-muted flex items-center justify-center transition-smooth"
                  aria-label="Clear search"
                  data-ocid="search.clear_button"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              )}
            </motion.div>

            {/* Result count pill */}
            {hasQuery && !isLoading && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-3 text-white/80 text-sm"
              >
                Found{" "}
                <span className="font-bold text-white">{results.length}</span>{" "}
                game{results.length !== 1 ? "s" : ""}
              </motion.p>
            )}
          </div>
        </section>

        {/* ═══ ADSENSE CONTENT ═══ */}
        <div className="w-full bg-muted/20 border-b border-border py-3 px-4 flex justify-center">
          <AdSense slot="content" className="w-full max-w-3xl" />
        </div>

        {/* ═══ MAIN CONTENT ═══ */}
        <div className="flex-1 max-w-[1400px] mx-auto w-full px-4 lg:px-6 py-8">
          {/* Empty query: show suggestions + popular categories + featured */}
          {!hasQuery && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-10"
            >
              {/* Popular Categories */}
              <div className="mb-8">
                <h2
                  className="font-display font-black text-lg text-foreground mb-4 flex items-center gap-2"
                  data-ocid="search.categories.section"
                >
                  <span className="w-7 h-7 rounded-lg gradient-primary flex items-center justify-center shrink-0">
                    <Gamepad2 className="w-4 h-4 text-white" />
                  </span>
                  Browse by Category
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
                  {CATEGORIES.map((cat, i) => (
                    <motion.button
                      key={cat}
                      type="button"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => handleCategoryClick(cat)}
                      className={`flex flex-col items-center gap-2 p-4 rounded-2xl bg-gradient-to-br ${CATEGORY_GRADIENTS[cat]} text-white font-semibold text-sm hover-lift cursor-pointer shadow-md`}
                      data-ocid={`search.category.item.${i + 1}`}
                    >
                      <span className="text-2xl">{CATEGORY_ICONS[cat]}</span>
                      <span className="font-display font-bold text-xs">
                        {cat}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Tag suggestions */}
              <div className="mb-8">
                <h2 className="font-display font-bold text-sm text-muted-foreground uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Popular Searches
                </h2>
                <div
                  className="flex flex-wrap gap-2"
                  data-ocid="search.suggestions.list"
                >
                  {SUGGESTION_TAGS.map((tag, i) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => handleTagClick(tag)}
                      className="px-4 py-1.5 rounded-full bg-card border border-border text-sm font-medium text-foreground hover:bg-primary/10 hover:border-primary/40 hover:text-primary transition-smooth"
                      data-ocid={`search.tag.item.${i + 1}`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Featured games */}
              {loadingFeatured ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
                  {Array.from({ length: 5 }, (_, i) => `feat-sk-${i}`).map(
                    (key) => (
                      <div key={key} className="rounded-2xl overflow-hidden">
                        <Skeleton className="aspect-video w-full" />
                        <div className="p-3 space-y-2 bg-card border border-t-0 border-border rounded-b-2xl">
                          <Skeleton className="h-4 w-3/4" />
                          <Skeleton className="h-3 w-1/2" />
                        </div>
                      </div>
                    ),
                  )}
                </div>
              ) : (featuredGames ?? []).length > 0 ? (
                <div>
                  <h2
                    className="font-display font-black text-lg text-foreground mb-4 flex items-center gap-2"
                    data-ocid="search.featured.section"
                  >
                    <span className="w-7 h-7 rounded-lg gradient-warm flex items-center justify-center shrink-0">
                      <Sparkles className="w-4 h-4 text-white" />
                    </span>
                    Popular Games
                  </h2>
                  <div
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4"
                    data-ocid="search.featured.list"
                  >
                    {(featuredGames ?? []).map((game, i) => (
                      <GameCard key={game.id} game={game} index={i} />
                    ))}
                  </div>
                </div>
              ) : null}
            </motion.div>
          )}

          {/* Query state: loading, results, or empty */}
          {hasQuery &&
            (isLoading ? (
              <div
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4"
                data-ocid="search.loading_state"
              >
                {Array.from({ length: 10 }, (_, i) => `sk-${i}`).map((key) => (
                  <div key={key} className="rounded-2xl overflow-hidden">
                    <Skeleton className="aspect-video w-full" />
                    <div className="p-3 space-y-2 bg-card border border-t-0 border-border rounded-b-2xl">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : results.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4"
                  data-ocid="search.results.list"
                >
                  {results.map((game, i) => (
                    <GameCard key={game.id} game={game} index={i} />
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-24 text-center"
                data-ocid="search.empty_state"
              >
                <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-5">
                  <Gamepad2 className="w-10 h-10 text-muted-foreground/40" />
                </div>
                <h2 className="font-display font-black text-2xl text-foreground mb-2">
                  No results found
                </h2>
                <p className="text-muted-foreground mb-3 max-w-sm">
                  We couldn't find any games matching{" "}
                  <span className="font-semibold text-foreground">
                    "{debouncedQuery}"
                  </span>
                  . Try a different keyword or browse a category.
                </p>
                <div className="flex flex-wrap gap-2 justify-center mb-6">
                  {SUGGESTION_TAGS.slice(0, 5).map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => handleTagClick(tag)}
                      className="px-3 py-1 rounded-full bg-card border border-border text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary transition-smooth"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
                <Button
                  variant="outline"
                  className="rounded-full"
                  onClick={handleClear}
                  data-ocid="search.clear_results_button"
                >
                  Browse all games
                </Button>
              </motion.div>
            ))}

          {/* Show all games when no query and done loading */}
          {!hasQuery && !loadingAll && (allGames ?? []).length > 0 && (
            <div className="mt-8">
              <h2
                className="font-display font-black text-lg text-foreground mb-4 flex items-center gap-2"
                data-ocid="search.all_games.section"
              >
                <span className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                  <Gamepad2 className="w-4 h-4 text-secondary-foreground" />
                </span>
                All Games
                <span className="text-sm font-medium text-muted-foreground ml-1">
                  ({(allGames ?? []).length})
                </span>
              </h2>
              <div
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4"
                data-ocid="search.all_games.list"
              >
                {(allGames ?? []).map((game, i) => (
                  <GameCard key={game.id} game={game} index={i} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
