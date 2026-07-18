import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";
const basePath = isGithubPages ? "/star-carpet" : "";

const nextConfig: NextConfig = {
  ...(isGithubPages
    ? {
        output: "export" as const,
        basePath,
        assetPrefix: basePath,
        trailingSlash: true,
      }
    : {}),
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  turbopack: {
    root: __dirname,
  },
  images: {
    unoptimized: isGithubPages,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.star-carpet.ru",
      },
      {
        protocol: "https",
        hostname: "star-carpet.ru",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  ...(!isGithubPages
    ? {
        async redirects() {
          return [
            {
              source: "/po-razmeshcheniyu/kovry-v-gostinuyu",
              destination: "/katalog?room=gostinaya",
              permanent: true,
            },
            {
              source: "/po-razmeshcheniyu/kovry-v-spalnyu",
              destination: "/katalog?room=spalnya",
              permanent: true,
            },
            {
              source: "/po-razmeshcheniyu/detskie-kovri",
              destination: "/katalog?room=detskaya&tag=детский",
              permanent: true,
            },
            {
              source: "/po-razmeshcheniyu/kovry-na-prihozhuyu",
              destination: "/katalog?room=koridor",
              permanent: true,
            },
            {
              source: "/po-forme/kovrovye-dorogki",
              destination: "/katalog?form=Ковровая дорожка&tag=дорожка",
              permanent: true,
            },
            {
              source: "/po-forme/kovrovye-dorozhki",
              destination: "/katalog?form=Ковровая дорожка&tag=дорожка",
              permanent: true,
            },
            {
              source: "/po-gruppam/kovry-ruchnoj-raboty",
              destination: "/katalog?tag=ручная работа",
              permanent: true,
            },
            {
              source: "/po-gruppam/s-dlinnym-vorsom",
              destination: "/katalog?tag=длинный ворс",
              permanent: true,
            },
            {
              source: "/novinki",
              destination: "/katalog?sort=new",
              permanent: true,
            },
            {
              source: "/rasprodazha",
              destination: "/katalog?sort=discount",
              permanent: true,
            },
            {
              source: "/akcii",
              destination: "/katalog?sort=discount",
              permanent: true,
            },
            {
              source: "/aktsii",
              destination: "/katalog?sort=discount",
              permanent: true,
            },
          ];
        },
      }
    : {}),
};

export default nextConfig;
