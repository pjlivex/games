import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "@tanstack/react-router";
import { ChevronRight, Gamepad2, Menu, Search, X } from "lucide-react";
import { type ReactNode, useState } from "react";
import { CATEGORIES, CATEGORY_ICONS } from "../types/game";
import { AdSense } from "./AdSense";

interface LayoutProps {
  children: ReactNode;
  hideSidebar?: boolean;
}

export function Layout({ children, hideSidebar = false }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (searchValue.trim()) {
      void navigate({ to: "/search", search: { q: searchValue.trim() } });
      setMobileMenuOpen(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* ═══ NAVBAR ═══ */}
      <header className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
        {/* Gradient accent bar */}
        <div className="h-1 gradient-primary w-full" />

        <div className="flex items-center gap-3 px-4 lg:px-6 h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 shrink-0 group"
            data-ocid="nav.logo.link"
          >
            <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <Gamepad2 className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-black text-xl hidden sm:block">
              <span className="text-primary">Play</span>
              <span className="text-foreground">Zone</span>
            </span>
          </Link>

          {/* Desktop Category Nav */}
          <nav
            className="hidden lg:flex items-center gap-1 ml-4"
            aria-label="Main navigation"
          >
            {CATEGORIES.slice(0, 6).map((cat) => (
              <Link
                key={cat}
                to="/category/$categoryName"
                params={{ categoryName: cat }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/10 transition-smooth"
                activeProps={{ className: "text-primary bg-primary/10" }}
                data-ocid="nav.category.link"
              >
                <span className="text-base leading-none">
                  {CATEGORY_ICONS[cat]}
                </span>
                {cat}
              </Link>
            ))}
          </nav>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="hidden sm:flex items-center gap-2 w-56 lg:w-72"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <Input
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search games..."
                className="pl-9 h-9 bg-muted/50 border-border focus:bg-card rounded-full text-sm"
                data-ocid="nav.search_input"
              />
            </div>
            <Button
              type="submit"
              size="sm"
              className="rounded-full h-9 px-4 gradient-primary border-0 text-white font-semibold hover:opacity-90"
              data-ocid="nav.search_button"
            >
              Go
            </Button>
          </form>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden p-2 rounded-lg hover:bg-muted transition-smooth"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            data-ocid="nav.mobile_menu_toggle"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-border bg-card px-4 py-3">
            <form onSubmit={handleSearch} className="flex gap-2 mb-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                <Input
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Search games..."
                  className="pl-9 h-9 bg-muted/50 rounded-full text-sm"
                  data-ocid="nav.mobile_search_input"
                />
              </div>
              <Button
                type="submit"
                size="sm"
                className="rounded-full gradient-primary border-0 text-white"
                data-ocid="nav.mobile_search_button"
              >
                <Search className="w-4 h-4" />
              </Button>
            </form>
            <div className="grid grid-cols-4 gap-2">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat}
                  to="/category/$categoryName"
                  params={{ categoryName: cat }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-muted transition-smooth text-center"
                >
                  <span className="text-2xl">{CATEGORY_ICONS[cat]}</span>
                  <span className="text-xs font-medium text-muted-foreground">
                    {cat}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* ═══ ADSENSE HEADER BANNER ═══ */}
      {/* AdSense Header Banner */}
      <div className="w-full bg-muted/20 border-b border-border py-2 px-4 flex justify-center">
        <AdSense slot="header" className="w-full max-w-3xl" />
      </div>

      {/* ═══ MAIN LAYOUT ═══ */}
      <div className="flex flex-1 min-h-0">
        {/* ═══ LEFT SIDEBAR ═══ */}
        {!hideSidebar && (
          <aside className="hidden lg:flex flex-col w-[250px] shrink-0 border-r border-border bg-card">
            <div className="p-4">
              <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-md gradient-primary flex items-center justify-center">
                  <Gamepad2 className="w-3 h-3 text-white" />
                </span>
                Categories
              </h2>
              <nav className="flex flex-col gap-0.5">
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat}
                    to="/category/$categoryName"
                    params={{ categoryName: cat }}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/8 transition-smooth group"
                    activeProps={{
                      className: "text-primary bg-primary/10 font-semibold",
                    }}
                    data-ocid="sidebar.category.link"
                  >
                    <span className="text-lg leading-none">
                      {CATEGORY_ICONS[cat]}
                    </span>
                    <span className="flex-1">{cat}</span>
                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-60 transition-opacity" />
                  </Link>
                ))}
              </nav>
            </div>

            {/* Sidebar AdSense */}
            <div className="p-4 mt-auto border-t border-border">
              <AdSense slot="sidebar" className="w-full" />
            </div>
          </aside>
        )}

        {/* ═══ CONTENT AREA ═══ */}
        <main className="flex-1 min-w-0 overflow-x-hidden">{children}</main>
      </div>

      {/* ═══ FOOTER ═══ */}
      <footer className="bg-card border-t border-border mt-auto">
        <div className="gradient-primary h-1 w-full" />
        <div className="px-6 py-8">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Brand */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <Gamepad2 className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="font-display font-black text-base">
                  <span className="text-primary">Play</span>
                  <span className="text-foreground">Zone</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Free Online Games
                </p>
              </div>
            </div>

            {/* Links */}
            <nav className="flex items-center gap-6 text-sm text-muted-foreground">
              {["About", "Contact", "Privacy Policy", "Terms of Service"].map(
                (item) => (
                  <a
                    key={item}
                    href="#_"
                    className="hover:text-primary transition-smooth"
                  >
                    {item}
                  </a>
                ),
              )}
            </nav>

            {/* Copyright */}
            <p className="text-xs text-muted-foreground text-center">
              © {new Date().getFullYear()}.{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-smooth"
              >
                Built with love using caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
