/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@smart-real-estate/types', '@smart-real-estate/common-utils'],
  images: {
    domains: ['localhost'],
  },
  typescript: {
    // 빌드 시 타입 체크 활성화
    ignoreBuildErrors: false,
  },
  eslint: {
    // 빌드 시 ESLint 체크 활성화
    ignoreDuringBuilds: false,
  },
}

module.exports = nextConfig 