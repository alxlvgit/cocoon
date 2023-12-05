/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
  reactStrictMode: false,
  images: {
    domains: ["velog.velcdn.com", "avatars.githubusercontent.com"],
  },
};

module.exports = nextConfig;
