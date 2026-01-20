import withPWA from "@ducanh2912/next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. 타입스크립트 에러 무시 (유지)
  typescript: {
    ignoreBuildErrors: true,
  },
  // 🚨 eslint 설정은 삭제했습니다! (이제 지원 안 함)
};

// PWA 설정
const pwaConfig = withPWA({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  disable: false,
  workboxOptions: {
    disableDevLogs: true,
  },
});

export default pwaConfig(nextConfig);