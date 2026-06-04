'use client'

import { useState } from 'react'

const NAV_LINKS = [
  { label: '서비스 소개',    href: '/about' },
  { label: '절차 가이드',    href: '/guide' },
  { label: '카테고리',       href: '/services' },
  { label: '자주 묻는 질문', href: '/faq' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-white/96 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* 로고 → 홈 링크 */}
          <a href="/" className="flex-shrink-0">
            <img
              src="/img/itda_logo_White_main.png"
              alt="잇다"
              className="h-16 w-auto object-contain"
              style={{ mixBlendMode: 'multiply' }}
              onError={e => {
                e.currentTarget.src = '/img/itda_logo_gradation.png'
                e.currentTarget.style.mixBlendMode = 'normal'
                e.currentTarget.onerror = null
              }}
            />
          </a>

          {/* 데스크탑 메뉴 */}
          <div className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map(l => (
              <a key={l.label} href={l.href}
                className="text-sm font-medium text-gray-500 hover:text-[#0057B8] transition-colors"
                style={{ letterSpacing: '-0.01em' }}>
                {l.label}
              </a>
            ))}
          </div>

          {/* 데스크탑 우측 버튼 */}
          <div className="hidden md:flex items-center gap-3">
            <a href="/checklist"
              className="text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors">
              정리 체크리스트
            </a>
            <a href="/services"
              className="px-5 py-2.5 text-sm font-bold text-white rounded-full shadow-md hover:opacity-90 transition-opacity"
              style={{ background: 'linear-gradient(135deg,#00C8A5,#0057B8)', letterSpacing: '-0.01em' }}>
              무료로 절차 찾기
            </a>
          </div>

          {/* 모바일 햄버거 */}
          <button onClick={() => setMenuOpen(v => !v)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl text-gray-600 hover:bg-gray-50"
            aria-label="메뉴">
            <span className="text-xl leading-none">{menuOpen ? '✕' : '☰'}</span>
          </button>
        </div>
      </div>

      {/* 모바일 드롭다운 */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-1">
          {NAV_LINKS.map(l => (
            <a key={l.label} href={l.href}
              onClick={() => setMenuOpen(false)}
              className="block py-2.5 text-sm font-medium text-gray-700 border-b border-gray-50 last:border-0">
              {l.label}
            </a>
          ))}
          <div className="pt-3 flex flex-col gap-2">
            <a href="/checklist" onClick={() => setMenuOpen(false)}
              className="text-center text-sm text-gray-500 py-2">
              정리 체크리스트
            </a>
            <a href="/services" onClick={() => setMenuOpen(false)}
              className="w-full py-3 text-sm font-bold text-white rounded-full text-center block"
              style={{ background: 'linear-gradient(135deg,#00C8A5,#0057B8)' }}>
              무료로 절차 찾기
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}