import { Metadata } from "next";
import { concat } from "ramda";

export const REDDIT_API = "https://www.reddit.com";
export const DEFAULT_SUBREDDIT = "Art";
export const DEFAULT_SORT = "hot";
export const REDGIFS_API = "https://api.redgifs.com";

export const FATHOM_SITE_ID = "JKBIIIAG";
export const FATHOM_INCLUDED_DOMAINS = [
  "lurkstation.com",
  "www.lurkstation.com",
];
export const IS_PROD = process.env.NEXT_PUBLIC_VERCEL_ENV === "production";

const TITLE = "Lurkstation";
const DESCRIPTION = "The best way to experience Reddit content.";
const URL = "https://www.lurkstation.com";

export const METADATA: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  icons: {
    icon: [
      { url: "/favicon_light.ico", media: "(prefers-color-scheme: light)" },
      { url: "/favicon_dark.ico", media: "(prefers-color-scheme: dark)" },
    ],
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    siteName: TITLE,
    images: [
      {
        url: `${URL}/opengraph.png`,
        width: 1200,
        height: 630,
      },
    ],
    locale: "en-US",
    type: "website",
  },
};

export const SUPPORTED_IMAGE_EXTENSIONS = [".jpeg", ".jpg", ".png", ".gif"];

export const SUPPORTED_VIDEO_EXTENSIONS = [".mp4", ".gifv"];

export const SUPPORTED_FILE_EXTENSIONS = concat(
  SUPPORTED_IMAGE_EXTENSIONS,
  SUPPORTED_VIDEO_EXTENSIONS
);
