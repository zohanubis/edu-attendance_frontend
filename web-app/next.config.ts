import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/public', 
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
