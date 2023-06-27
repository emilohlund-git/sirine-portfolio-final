/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    return config;
  },
  images: {
    domains: ["127.0.0.1", "localhost", "sirine.fly.dev"],
  },
};

module.exports = nextConfig;
