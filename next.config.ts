import type { NextConfig } from "next";

/**
 * HDM Industrial — static export.
 * Spanish lives at the root `/` (Prompt Supremo §101); pt/en/ca under `/pt`, `/en`, `/ca`.
 * Request backend is provider-based (env). See src/server/requests/.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: false,
  images: {
    // Local images only (public/images). No remote stock hotlinking as proof.
    unoptimized: true,
  },
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
