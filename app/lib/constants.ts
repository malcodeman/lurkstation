import { Metadata } from "next";
import { concat, equals } from "ramda";

export const REDDIT_API = "https://old.reddit.com";
export const DEFAULT_SUBREDDIT = "Art";
export const DEFAULT_SORT = "hot";

export const IS_PROD = equals(process.env.NEXT_PUBLIC_VERCEL_ENV, "production");

const TITLE = "Lurkstation";
const DESCRIPTION = "The best way to experience Reddit content.";
const URL = "https://www.lurkstation.com";
const AUTHOR = "Amer Karamustafić";
const KEYWORDS = [
  "Reddit client",
  "Content-oriented",
  "Images",
  "Videos",
  "Efficient browsing",
  "Reddit content",
  "Image gallery",
  "Optimized viewing",
  "Reddit media",
  "Visual content",
  "Reddit browsing",
  "Content consumption",
  "Reddit images",
  "Reddit videos",
  "Reddit enhancement",
  "Content aggregation",
  "Reddit experience",
];

export const METADATA: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  applicationName: "lurkstation",
  authors: [{ name: AUTHOR, url: "https://www.malcodeman.com" }],
  generator: "Next.js",
  keywords: KEYWORDS,
  referrer: "origin",
  creator: AUTHOR,
  publisher: AUTHOR,
  icons: {
    icon: [
      { url: "/favicon_light.ico", media: "(prefers-color-scheme: light)" },
      { url: "/favicon_dark.ico", media: "(prefers-color-scheme: dark)" },
    ],
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    url: URL,
    title: TITLE,
    description: DESCRIPTION,
    siteName: TITLE,
    images: [
      {
        url: `${URL}/opengraph.png`,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: `${URL}/opengraph.png`,
        width: 1200,
        height: 630,
      },
    ],
  },
  category: "Social Media",
};

export const SUPPORTED_IMAGE_EXTENSIONS = [".jpeg", ".jpg", ".png", ".gif"];

export const SUPPORTED_VIDEO_EXTENSIONS = [".mp4", ".gifv"];

export const SUPPORTED_FILE_EXTENSIONS = concat(
  SUPPORTED_IMAGE_EXTENSIONS,
  SUPPORTED_VIDEO_EXTENSIONS
);
