import motivational from "@/assets/p-motivational.jpg";
import sports from "@/assets/p-sports.jpg";
import tvshows from "@/assets/p-tvshows.jpg";
import movies from "@/assets/p-movies.jpg";
import scenery from "@/assets/p-scenery.jpg";
import booklover from "@/assets/p-booklover.jpg";
import bundleImg from "@/assets/bundle.jpg";
import life1 from "@/assets/life-1.jpg";
import life4 from "@/assets/life-4.jpg";

export type Product = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  mrp: number;
  category: string;
  bestseller?: boolean;
  designs: string[];
  image: string;
  gallery: string[];
};

export const CATEGORIES = [
  "All",
  "Motivational",
  "Sports",
  "TV Shows",
  "Movies",
  "Scenery",
  "Book Lover",
] as const;

export const products: Product[] = [
  {
    id: "focus-plan-grow",
    name: "Focus. Plan. Grow.",
    tagline: "For the one with a to-do list and a dream",
    description:
      "A daily nudge clipped to your page. Warm terracotta, quiet typography, and magnets that mean it.",
    price: 60,
    mrp: 80,
    category: "Motivational",
    bestseller: true,
    designs: ["Terracotta", "Cream", "Ink"],
    image: motivational,
    gallery: [motivational, life4, life1],
  },
  {
    id: "match-day",
    name: "Match Day",
    tagline: "Cricket, football, and one more chapter",
    description:
      "Line-art legends in midnight navy. Built for sports biographies and late-night readers.",
    price: 70,
    mrp: 90,
    category: "Sports",
    designs: ["Navy", "Cream"],
    image: sports,
    gallery: [sports, life4, life1],
  },
  {
    id: "tune-in-read-on",
    name: "Tune In, Read On",
    tagline: "Retro telly energy, zero buffering",
    description:
      "A vintage set in forest green and mustard for people who binge books like seasons.",
    price: 70,
    mrp: 90,
    category: "TV Shows",
    bestseller: true,
    designs: ["Forest", "Mustard"],
    image: tvshows,
    gallery: [tvshows, life1, life4],
  },
  {
    id: "final-cut",
    name: "Final Cut",
    tagline: "Bookmark your main character moment",
    description:
      "Charcoal and gold foil-look film reel. The most cinematic way to say 'pause here'.",
    price: 80,
    mrp: 100,
    category: "Movies",
    bestseller: true,
    designs: ["Charcoal", "Gold"],
    image: movies,
    gallery: [movies, life4, life1],
  },
  {
    id: "quiet-hills",
    name: "Quiet Hills",
    tagline: "A little window between the pages",
    description:
      "Soft watercolour mountains in sage and dusty blue. Calm, slow, and very screenshot-able.",
    price: 70,
    mrp: 90,
    category: "Scenery",
    designs: ["Sage", "Dusty Blue"],
    image: scenery,
    gallery: [scenery, life1, life4],
  },
  {
    id: "one-more-chapter",
    name: "Just One More Chapter",
    tagline: "For people who dog-ear books emotionally, not physically",
    description:
      "Burgundy, books and a cup of something warm. Made for reading time and thoughtful gifts.",
    price: 60,
    mrp: 80,
    category: "Book Lover",
    bestseller: true,
    designs: ["Burgundy", "Cream"],
    image: booklover,
    gallery: [booklover, life1, life4],
  },
];

export type Bundle = {
  id: string;
  name: string;
  count: number;
  price: number;
  mrp: number;
  blurb: string;
};

export const bundles: Bundle[] = [
  {
    id: "bundle-1",
    name: "Single Bookmark",
    count: 1,
    price: 60,
    mrp: 80,
    blurb: "One page, perfectly held. Pick any design you like.",
  },
  {
    id: "bundle-3",
    name: "Set of 3",
    count: 3,
    price: 160,
    mrp: 210,
    blurb: "For the three books you're reading at once. No judgement.",
  },
  {
    id: "bundle-5",
    name: "Reader's Pack — Set of 5",
    count: 5,
    price: 250,
    mrp: 350,
    blurb: "Gift-ready sleeve. Keep two, give three, feel wonderful.",
  },
];

export const bundleImage = bundleImg;

export function getProduct(id: string) {
  return products.find((p) => p.id === id);
}

export const rupees = (n: number) => `₹${n.toLocaleString("en-IN")}`;
