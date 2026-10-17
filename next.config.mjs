/** @type {import('next').NextConfig} */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  images: {
    unoptimized: true,
  },
  webpack: (config, { dev }) => {
    if (dev) {
      // Use memory cache in dev to avoid OneDrive/Windows file rename lock errors
      config.cache = {
        type: 'memory',
      };
    }
    return config;
  },
};

export default nextConfig;
