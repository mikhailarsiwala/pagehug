import motivational from "@/assets/p-motivational.jpg";
import sports from "@/assets/p-sports.jpg";
import tvshows from "@/assets/p-tvshows.jpg";
import movies from "@/assets/p-movies.jpg";
import scenery from "@/assets/p-scenery.jpg";
import booklover from "@/assets/p-booklover.jpg";
import bundleImg from "@/assets/bundle.jpg";
import life1 from "@/assets/life-1.jpg";
import life4 from "@/assets/life-4.jpg";
import breakingbad from "@/assets/p-breakingbad.jpg";
import messi from "@/assets/p-messi.jpg";
import bojack from "@/assets/p-bojack.jpg";
import starrypines from "@/assets/p-starrypines.jpg";

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
  {
    id: "i-am-the-danger",
    name: "I Am The Danger",
    tagline: "For the reader who knocks",
    description:
      "High-contrast ink portrait in black and white. Bold, graphic, and impossible to lose between pages.",
    price: 80,
    mrp: 100,
    category: "TV Shows",
    bestseller: true,
    designs: ["Black & White"],
    image: breakingbad,
    gallery: [breakingbad, life1, life4],
  },
  {
    id: "leo-messi",
    name: "Leo Messi",
    tagline: "Ten out of ten on every page",
    description:
      "Comic-style halftone portrait in blue and red. Made for football fans who read between matches.",
    price: 80,
    mrp: 100,
    category: "Sports",
    bestseller: true,
    designs: ["Blue & Red"],
    image: messi,
    gallery: [messi, life4, life1],
  },
  {
    id: "bojack-horseman",
    name: "BoJack Horseman",
    tagline: "Back in the nineties, he was in a very famous book",
    description:
      "Midnight purple night sky illustration. Wry, warm, and a little melancholy — like your favourite chapter.",
    price: 80,
    mrp: 100,
    category: "TV Shows",
    designs: ["Midnight Purple"],
    image: bojack,
    gallery: [bojack, life1, life4],
  },
  {
    id: "starry-pines",
    name: "Starry Pines",
    tagline: "A quiet night tucked into your book",
    description:
      "Hand-painted watercolour pines under a starry blue sky. Calm, dreamy, and perfect for slow reading.",
    price: 70,
    mrp: 90,
    category: "Scenery",
    designs: ["Night Blue"],
    image: starrypines,
    gallery: [starrypines, life1, life4],
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
