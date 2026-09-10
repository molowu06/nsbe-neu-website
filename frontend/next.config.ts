// frontend/next.config.ts
import path from 'path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  devIndicators: false,
  allowedDevOrigins: ['10.110.88.196'],

  /*
  The repo root holds a leftover empty package-lock.json (and no package.json),
  so Next inferred the *parent* directory as its workspace root and traced files
  across the whole tree — including a half-populated root node_modules. That made
  the first dev compile take ~96s. Pinning the root to this app directory keeps
  tracing scoped to the real project.
  */
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;