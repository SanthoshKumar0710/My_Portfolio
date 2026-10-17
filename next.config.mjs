/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
