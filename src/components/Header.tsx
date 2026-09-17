import { Link, useNavigate } from "@tanstack/react-router";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useStore } from "@/lib/store";

const NAV = [
  { to: "/shop", label: "Shop" },
  { to: "/bestsellers", label: "Bestsellers" },
  { to: "/bundles", label: "Bundles" },
  { to: "/about", label: "About" },
  { to: "/faq", label: "FAQ" },
] as const;

export function Header() {
  const { count, setCartOpen, wishlist } = useStore();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchOpen(false);
    setOpen(false);
    navigate({ to: "/shop", search: { q: q || undefined, category: undefined } });
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/85 shadow-[var(--shadow-soft)] backdrop-blur-xl" : "bg-background"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 lg:px-8">
        <div className="flex items-center gap-2 lg:hidden">
          <button type="button" onClick={() => setOpen((v) => !v)} aria-label="Menu">
            {open ? <Menu size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <Link to="/" className="font-display text-xl tracking-tight">
          MarkMyPlace<span className="text-primary">.</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm lg:flex">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="relative text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button type="button" onClick={() => setSearchOpen((v) => !v)} aria-label="Search">
            <Search size={18} />
          </button>
          <Link to="/account" aria-label="Account" className="hidden sm:block">
            <User size={18} />
          </Link>
          <Link to="/wishlist" aria-label="Wishlist" className="relative">
            <Heart size={18} />
            {wishlist.length > 0 && (
              <span className="absolute -right-2 -top-2 grid h-4 w-4 place-items-center rounded-full bg-primary text-[0.6rem] text-primary-foreground">
                {wishlist.length}
              </span>
            )}
          </Link>
          <button
            type="button"
            onClick={() => setCartOpen(true)}
            aria-label="Shopping bag"
            className="relative"
          >
            <ShoppingBag size={18} />
            {count > 0 && (
              <span className="absolute -right-2 -top-2 grid h-4 w-4 place-items-center rounded-full bg-primary text-[0.6rem] text-primary-foreground">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>

      {searchOpen && (
        <form onSubmit={submit} className="border-t border-border bg-card px-5 py-4 lg:px-8">
          <div className="mx-auto flex max-w-3xl items-center gap-3">
            <Search size={16} className="text-muted-foreground" />
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search designs — movies, scenery, book lover…"
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            <button type="button" onClick={() => setSearchOpen(false)} aria-label="Close search">
              <X size={16} />
            </button>
          </div>
        </form>
      )}

      {open && (
        <nav className="border-t border-border bg-card px-5 py-4 lg:hidden">
          <ul className="space-y-3 text-sm">
            {NAV.map((n) => (
              <li key={n.to}>
                <Link to={n.to} onClick={() => setOpen(false)} className="block py-1">
                  {n.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/wishlist" onClick={() => setOpen(false)} className="block py-1">
                Wishlist
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
