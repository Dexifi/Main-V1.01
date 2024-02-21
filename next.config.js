/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "solareum.app",
      },
      {
        protocol: "https",
        hostname: "dev.solend.fi",
      },
      {
        protocol: "https",
        hostname: "solana.com",
      },
      {
        protocol: "https",
        hostname: "static.jup.ag",
      },
      {
        protocol: "https",
        hostname: "dev.solend.fi",
      },
      {
        protocol: "https",
        hostname: "solana.com",
      },
    ],
  },
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
