/** @type {import('next').NextConfig} */
const nextConfig = {
  // webpack: (config) => {
  //   config.module.rules.push({
  //     test: /\.node/,
  //     use: "raw-loader",
  //   });
  //   return config;
  // },
  experimental: {
    serverActions: true,
    serverActionsBodySizeLimit: "3mb",
    appDir: true,
  },
  webpack(config) {
    config.experiments = { ...config.experiments, topLevelAwait: true };
    config.externals = [...config.externals, 'hnswlib-node'];  // by adding this line, solved the import
    return config;
  },
};

module.exports = nextConfig;
