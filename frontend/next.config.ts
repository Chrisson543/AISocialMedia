import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  images: {
    remotePatterns: [
      {
      protocol: "https",
      hostname: "**",   // ← Not officially supported, usually fails
      pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
