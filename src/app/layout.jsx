import './globals.css'

export const metadata = {
  title: '잇다 — 흩어진 절차를, 한 곳으로',
  description: '사망 이후 필요한 절차와 기관을 한 곳에서 안내합니다. 복잡한 절차, 한 곳에서 잇다.',
  icons: { icon: '/img/itda_logo_gradation.png' },
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
