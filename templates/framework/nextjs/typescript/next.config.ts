import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'dist-front',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
