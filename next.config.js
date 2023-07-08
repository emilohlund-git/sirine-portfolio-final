/** @type {import('next').NextConfig} */
const withPWAInit = require("next-pwa");

const withPWA = withPWAInit({
  dest: "public",
  register: true,
  skipWaiting: true,
  buildExcludes: ["app-build-manifest.json"],
});

const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;

    return config;
  },
  images: {
    domains: ["127.0.0.1", "localhost", "sirine.fly.dev"],
    unoptimized: true,
    path: "https://sirine.fly.dev/",
  },
};

module.exports = withPWA(nextConfig);
