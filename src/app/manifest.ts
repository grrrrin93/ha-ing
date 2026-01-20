import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: '하잉 - AI 영어 일기',
    short_name: '하잉',
    description: 'AI와 함께하는 매일 영어 일기',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#ffffff',
    icons: [
        {
          src: '/icon-192.png?v=2',  // 👈 뒤에 ?v=2 를 붙였습니다!
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/icon-512.png?v=2',  // 👈 여기도 ?v=2 추가!
          sizes: '512x512',
          type: 'image/png',
        },
      ],
  }
}