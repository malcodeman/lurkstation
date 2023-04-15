import { Metadata } from "next";

export const REDDIT_API = "https://www.reddit.com";
export const DEFAULT_SUBREDDIT = "art";
export const DEFAULT_SORT = "hot";

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
