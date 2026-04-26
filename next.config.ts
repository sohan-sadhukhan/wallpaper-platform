import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  typedRoutes: true,
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wallpaper-plat.sgp1.cdn.digitaloceanspaces.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
