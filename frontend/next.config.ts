// frontend/next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  devIndicators: false,
  allowedDevOrigins: ['10.110.88.196'],
};

export default nextConfig;