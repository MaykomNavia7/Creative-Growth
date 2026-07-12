/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enforce React strict mode for highlighting potential problems
  reactStrictMode: true,

  // Remove the X-Powered-By header for security
  poweredByHeader: false,

  // Transpile workspace packages that ship raw TypeScript/JSX source
  transpilePackages: ["@repo/ui"],

  experimental: {
    // Tree-shake large icon and animation packages at build time
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },

  images: {
    // Prefer modern formats for better compression
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
