/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: {
    //     disable fs module
    fs: false,
  },
};

module.exports = nextConfig;
