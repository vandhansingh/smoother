/** @type {import('next').NextConfig} */
const nextConfig = {
  /* STATIC_EXPORT=1 emits a fully static bundle into out/, which
     scripts/single-file.mjs then folds into one self-contained HTML
     file for hosts that serve a single document. */
  output: process.env.STATIC_EXPORT ? 'export' : undefined,
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error'] } : false,
  },
};

export default nextConfig;
