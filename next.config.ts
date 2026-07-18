import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  images: {
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
};

export default nextConfig;
