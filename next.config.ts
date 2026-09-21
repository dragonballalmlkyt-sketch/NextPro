import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "www.chitkara.edu.in",
        protocol: "https",
        port: "",
      },
      {
        hostname: "helpful-herring-958.convex.cloud",
        protocol: "https",
        port: "",
      }
    ],
  }
};

export default nextConfig;
