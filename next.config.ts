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
        hostname: '*.convex.site',
        protocol: "https",
        port: "",
      },
      {
        hostname: '*.convex.cloud',
        protocol: "https",
        port: "",
      }
    ],
  }
};

export default nextConfig;
