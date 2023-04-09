/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.redd.it",
      },
      {
        protocol: "https",
        hostname: "www.reddit.com",
      },
      {
        hostname: "i.imgur.com",
      },
    ],
  },
};

module.exports = nextConfig;
