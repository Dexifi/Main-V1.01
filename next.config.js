/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        module: false,
        net: false,
        path: false,
        tls: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;
