/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  rewrites: async () => [
    {
      source: "/",
      destination: "/index.html",
    },
  ],
};

module.exports = nextConfig;
