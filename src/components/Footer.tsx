import { Link } from "@tanstack/react-router";
import { Instagram, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-sand/60">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="space-y-3">
          <p className="font-display text-xl">
            Pagehug<span className="text-primary">.</span>
          </p>
          <p className="max-w-xs text-sm text-muted-foreground">
            Magnetic bookmarks made in India for people who dog-ear books emotionally, not
            physically.
          </p>
          <div className="flex items-center gap-4 pt-2">
            <a href="https://instagram.com" aria-label="Instagram" className="hover:text-primary">
              <Instagram size={18} />
            </a>
            <a href="mailto:hello@pagehug.in" aria-label="Email" className="hover:text-primary">
              <Mail size={18} />
            </a>
          </div>
        </div>

        <div className="space-y-3 text-sm">
          <p className="eyebrow">Shop</p>
          <ul className="space-y-2 text-muted-foreground">
            <li>
              <Link to="/shop" className="hover:text-foreground">
                All bookmarks
              </Link>
            </li>
            <li>
              <Link to="/bestsellers" className="hover:text-foreground">
                Bestsellers
              </Link>
            </li>
            <li>
              <Link to="/bundles" className="hover:text-foreground">
                Bundles
              </Link>
            </li>
            <li>
              <Link to="/wishlist" className="hover:text-foreground">
                Wishlist
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-3 text-sm">
          <p className="eyebrow">Support</p>
          <ul className="space-y-2 text-muted-foreground">
            <li>
              <Link to="/faq" className="hover:text-foreground">
                FAQ
              </Link>
            </li>
            <li>
              <Link to="/shipping" className="hover:text-foreground">
                Shipping &amp; Returns
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-foreground">
                Our story
              </Link>
            </li>
            <li>
              <a href="mailto:hello@pagehug.in" className="hover:text-foreground">
                hello@pagehug.in
              </a>
            </li>
          </ul>
        </div>

        <div className="space-y-3 text-sm">
          <p className="eyebrow">Legal</p>
          <ul className="space-y-2 text-muted-foreground">
            <li>
              <Link to="/privacy" className="hover:text-foreground">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-foreground">
                Terms
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border px-5 py-6 text-center text-xs text-muted-foreground lg:px-8">
        © {new Date().getFullYear()} Pagehug. Bookmark your main character moment.
      </div>
    </footer>
  );
}
