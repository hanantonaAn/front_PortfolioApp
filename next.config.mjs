/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
        remotePatterns: [
            {
                hostname: 'localhost',
            },
        ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: { and: [/\.(js|ts|md)x?$/] },

      use: ['@svgr/webpack'],
    });

    return config;
  },
};

export default nextConfig;
