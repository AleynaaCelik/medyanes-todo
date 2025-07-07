import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ESLint'i build sırasında devre dışı bırak
  },
  typescript: {
    ignoreBuildErrors: false, // TypeScript kontrolü aktif kalacak
  },
};

export default nextConfig;