import { AdSense } from "@/components/AdSense";
import { GameCard } from "@/components/GameCard";
import { Layout } from "@/components/Layout";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useNavigate } from "@tanstack/react-router";
import { ChevronRight, Search, Sparkles, Zap } from "lucide-react";
import { useRef, useState } from "react";
import {
  useFeaturedGames,
  useGamesByCategory,
  useNewGames,
} from "../hooks/useGames";
import { CATEGORIES, CATEGORY_ICONS } from "../types/game";

// ── Color maps ─────────────────────────────────────────────
const PILL_GRADIENTS: Record<string, string> = {
  Action: "from-red-500 to-orange-500",
  Puzzle: "from-blue-500 to-indigo-500",
  Racing: "from-orange-400 to-yellow-400",
  Sports: "from-green-500 to-emerald-400",
  Adventure: "from-yellow-500 to-amber-500",
  Casual: "from-purple-500 to-violet-500",
  Multiplayer: "from-pink-500 to-rose-500",
  Girls: "from-rose-400 to-pink-300",
};

const SECTION_GRADIENTS: Record<string, string> = {
  Action: "from-red-500 to-orange-500",
  Puzzle: "from-blue-500 to-indigo-500",
  Racing: "from-orange-400 to-yellow-400",
  Casual: "from-purple-500 to-violet-500",
};

const SECTION_CATEGORIES = ["Action", "Puzzle", "Racing", "Casual"] as const;

const FLOATING_EMOJIS = [
  { emoji: "🎮", top: "12%", left: "4%", size: "text-5xl", delay: "0s" },
  { emoji: "🕹️", top: "22%", right: "5%", size: "text-4xl", delay: "0.5s" },
  { emoji: "⭐", top: "65%", left: "3%", size: "text-3xl", delay: "0.9s" },
  { emoji: "🏆", top: "72%", right: "4%", size: "text-4xl", delay: "0.3s" },
  { emoji: "🎯", top: "42%", left: "7%", size: "text-3xl", delay: "1.2s" },
  { emoji: "🚀", top: "15%", right: "11%", size: "text-3xl", delay: "0.6s" },
  { emoji: "💎", top: "82%", left: "9%", size: "text-2xl", delay: "1.0s" },
  { emoji: "🔥", top: "52%", right: "8%", size: "text-3xl", delay: "0.2s" },
];

// ── Hero ──────────────────────────────────────────────────
function HeroSection() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      navigate({ to: "/search", search: { q: query.trim() } });
    }
  }

  return (
    <section
      className="relative overflow-hidden"
      data-ocid="hero.section"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.48 0.28 310) 0%, oklch(0.50 0.26 280) 45%, oklch(0.62 0.22 195) 100%)",
      }}
    >
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute rounded-full opacity-25 blur-3xl"
          style={{
            width: "700px",
            height: "700px",
            background: "oklch(0.78 0.22 55)",
            top: "-250px",
            right: "-150px",
          }}
        />
        <div
          className="absolute rounded-full opacity-20 blur-3xl"
          style={{
            width: "500px",
            height: "500px",
            background: "oklch(0.68 0.26 140)",
            bottom: "-180px",
            left: "-100px",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle, white 1.5px, transparent 1.5px)",
            backgroundSize: "45px 45px",
          }}
        />
      </div>

      {/* Floating emojis */}
      <div className="absolute inset-0 pointer-events-none hidden md:block">
        {FLOATING_EMOJIS.map((item) => (
          <span
            key={item.emoji}
            className={`absolute ${item.size} opacity-25 animate-bounce select-none`}
            style={{
              top: item.top,
              left:
                "left" in item ? (item as { left?: string }).left : undefined,
              right:
                "right" in item
                  ? (item as { right?: string }).right
                  : undefined,
              animationDelay: item.delay,
              animationDuration: "3.5s",
            }}
          >
            {item.emoji}
          </span>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 py-20 md:py-28 text-center">
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 mb-6">
          <Sparkles className="w-4 h-4 text-yellow-300 shrink-0" />
          <span className="text-white text-sm font-bold tracking-wide uppercase">
            100% Free · No Download · Play Instantly
          </span>
          <Sparkles className="w-4 h-4 text-yellow-300 shrink-0" />
        </div>

        <h1 className="font-display text-5xl md:text-7xl font-black text-white leading-none mb-4 drop-shadow-2xl">
          Play{" "}
          <span
            style={{
              background:
                "linear-gradient(135deg, oklch(0.95 0.20 80), oklch(0.88 0.18 55))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            FREE
          </span>{" "}
          Games
          <br />
          <span
            style={{
              background:
                "linear-gradient(135deg, oklch(0.95 0.12 200), oklch(0.88 0.18 170))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Online!
          </span>
        </h1>

        <p className="text-white/90 text-xl md:text-2xl font-semibold mb-10 drop-shadow">
          Hundreds of free games — no download needed!
        </p>

        <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
          <div className="relative flex items-center">
            <div className="absolute left-5 text-white/50 pointer-events-none">
              <Search className="w-6 h-6" />
            </div>
            <input
              ref={inputRef}
              type="text"
              placeholder="Search for games..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-14 pr-36 py-5 rounded-2xl text-foreground font-display font-semibold text-lg placeholder:text-muted-foreground bg-white/96 backdrop-blur-sm shadow-2xl border-2 border-white/60 focus:outline-none focus:border-white transition-all"
              data-ocid="hero.search_input"
            />
            <button
              type="submit"
              className="absolute right-3 px-6 py-3 rounded-xl font-display font-bold text-white transition-smooth hover:brightness-110 active:scale-95 shadow-lg"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.55 0.24 305), oklch(0.58 0.22 250))",
              }}
              data-ocid="hero.submit_button"
            >
              Search
            </button>
          </div>
        </form>

        <div className="flex items-center justify-center gap-10 mt-10 text-white/90">
          {[
            { icon: "🎮", label: "40+ Games" },
            { icon: "🔥", label: "Daily Updates" },
            { icon: "⚡", label: "Instant Play" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-2 text-sm font-bold"
            >
              <span className="text-xl">{stat.icon}</span>
              {stat.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Category Strip ────────────────────────────────────────
function CategoryStrip() {
  return (
    <section
      className="bg-card border-b border-border"
      data-ocid="categories.section"
    >
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div
          className="flex items-center gap-3 overflow-x-auto pb-1"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {CATEGORIES.map((cat) => {
            const gradient = PILL_GRADIENTS[cat] ?? "from-primary to-accent";
            const icon = CATEGORY_ICONS[cat] ?? "🎮";
            return (
              <Link
                key={cat}
                to="/category/$categoryName"
                params={{ categoryName: cat }}
                className={`flex-shrink-0 flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r ${gradient} text-white font-display font-bold text-sm shadow-md hover:shadow-xl hover-lift transition-smooth whitespace-nowrap`}
                data-ocid="categories.tab"
              >
                <span className="text-base leading-none">{icon}</span>
                {cat}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── Section Heading ───────────────────────────────────────
function SectionHeading({
  title,
  accent,
  viewAllHref,
  viewAllLabel = "View All",
}: {
  title: string;
  accent: string;
  viewAllHref?: string;
  viewAllLabel?: string;
}) {
  return (
    <div className="flex items-center justify-between mb-5">
      <div className="flex items-center gap-3">
        <div
          className={`w-1.5 h-9 rounded-full bg-gradient-to-b ${accent} shadow-sm`}
        />
        <h2 className="font-display font-black text-2xl md:text-3xl text-foreground">
          {title}
        </h2>
      </div>
      {viewAllHref && (
        <Link
          to={viewAllHref as "/"}
          className="flex items-center gap-1 text-sm font-bold text-primary hover:text-primary/80 transition-colors"
          data-ocid="section.view_all.link"
        >
          {viewAllLabel}
          <ChevronRight className="w-4 h-4" />
        </Link>
      )}
    </div>
  );
}

// ── Card Skeletons ────────────────────────────────────────
function CardSkeletons({ count = 4 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => `sk-${i}`).map((key) => (
        <div
          key={key}
          className="rounded-2xl overflow-hidden"
          data-ocid="home.loading_state"
        >
          <Skeleton className="aspect-video w-full" />
          <div className="bg-card border border-t-0 border-border rounded-b-2xl p-3 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </>
  );
}

// ── Featured Games ────────────────────────────────────────
function FeaturedGamesSection() {
  const { data: games, isLoading } = useFeaturedGames();

  return (
    <section data-ocid="featured.section">
      <SectionHeading
        title="Featured Games ⭐"
        accent="from-primary to-accent"
        viewAllHref="/search"
        viewAllLabel="See All"
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {isLoading ? (
          <CardSkeletons count={4} />
        ) : (
          games?.map((game, idx) => (
            <GameCard key={game.id} game={game} index={idx} />
          ))
        )}
      </div>
    </section>
  );
}

// ── New Games ─────────────────────────────────────────────
function NewGamesSection() {
  const { data: games, isLoading } = useNewGames();

  return (
    <section data-ocid="new-games.section">
      <SectionHeading
        title="New Games 🆕"
        accent="from-green-500 to-teal-400"
        viewAllHref="/search"
        viewAllLabel="View All"
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {isLoading ? (
          <CardSkeletons count={4} />
        ) : (
          games?.map((game, idx) => (
            <GameCard key={game.id} game={game} index={idx} />
          ))
        )}
      </div>
    </section>
  );
}

// ── Category Row ──────────────────────────────────────────
function CategoryRowSection({ category }: { category: string }) {
  const { data: games, isLoading } = useGamesByCategory(category);
  const icon = CATEGORY_ICONS[category] ?? "🎮";
  const gradient = SECTION_GRADIENTS[category] ?? "from-primary to-accent";

  return (
    <section data-ocid={`category-row.${category.toLowerCase()}.section`}>
      <SectionHeading
        title={`${icon} ${category} Games`}
        accent={gradient}
        viewAllHref={`/category/${category}`}
        viewAllLabel={`See All ${category} →`}
      />
      <div
        className="flex gap-4 overflow-x-auto pb-3"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {isLoading
          ? Array.from({ length: 5 }, (_, i) => `sk-cat-${i}`).map((key) => (
              <div
                key={key}
                className="flex-shrink-0 w-40 rounded-2xl overflow-hidden"
              >
                <Skeleton className="w-40 h-28" />
                <div className="bg-card border border-t-0 border-border rounded-b-2xl p-2 space-y-1.5">
                  <Skeleton className="h-3 w-3/4" />
                  <Skeleton className="h-2.5 w-1/2" />
                </div>
              </div>
            ))
          : games?.slice(0, 8).map((game, idx) => (
              <div key={game.id} className="flex-shrink-0 w-40 min-w-[160px]">
                <GameCard game={game} index={idx} />
              </div>
            ))}
      </div>
    </section>
  );
}

// ── Trending Banner ───────────────────────────────────────
function TrendingBanner() {
  return (
    <section
      className="py-12 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.50 0.28 310) 0%, oklch(0.65 0.22 195) 100%)",
      }}
      data-ocid="trending.section"
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.08]"
        style={{
          backgroundImage:
            "radial-gradient(circle, white 1.5px, transparent 1.5px)",
          backgroundSize: "35px 35px",
        }}
      />
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 mb-4">
          <Zap className="w-6 h-6 text-yellow-300" />
          <h2 className="font-display font-black text-3xl text-white">
            Ready to Play?
          </h2>
          <Zap className="w-6 h-6 text-yellow-300" />
        </div>
        <p className="text-white/90 text-lg font-medium mb-7">
          Jump into hundreds of free browser games — no sign-up, no download!
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {CATEGORIES.map((cat) => {
            const icon = CATEGORY_ICONS[cat] ?? "🎮";
            const gradient = PILL_GRADIENTS[cat] ?? "from-primary to-accent";
            return (
              <Link
                key={cat}
                to="/category/$categoryName"
                params={{ categoryName: cat }}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r ${gradient} text-white font-bold text-sm shadow-lg hover:shadow-xl hover-lift transition-smooth`}
                data-ocid="trending.category.link"
              >
                <span>{icon}</span>
                {cat}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── Home Page ─────────────────────────────────────────────
export default function HomePage() {
  return (
    <Layout>
      <HeroSection />
      <CategoryStrip />

      <main
        className="max-w-7xl mx-auto px-4 py-10 space-y-14"
        data-ocid="home.page"
      >
        <FeaturedGamesSection />

        <div data-ocid="adsense.mid.content">
          <AdSense
            slot="content"
            className="w-full rounded-xl overflow-hidden"
          />
        </div>

        <NewGamesSection />

        {SECTION_CATEGORIES.map((cat) => (
          <CategoryRowSection key={cat} category={cat} />
        ))}

        <div data-ocid="adsense.bottom.content">
          <AdSense
            slot="content"
            className="w-full rounded-xl overflow-hidden"
          />
        </div>
      </main>

      <TrendingBanner />
    </Layout>
  );
}
