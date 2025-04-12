/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'dist-front',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
