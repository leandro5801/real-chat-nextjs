/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    URL_API: process.env.URL_API_SERVER,
  },
};

export default nextConfig;
