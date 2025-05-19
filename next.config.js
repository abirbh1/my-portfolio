// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',

  // serve assets from "./_next/..." instead of "/my-portfolio/_next/..."
  assetPrefix: './',

  // optional, but ensures every page is a folder with index.html
  trailingSlash: true,
};

module.exports = nextConfig;