/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
  experimental: {
    serverActionsBodySizeLimit: "3mb",
  },
  reactStrictMode: false,
  images: {
    domains: ["velog.velcdn.com"],
  },
};

module.exports = nextConfig;
