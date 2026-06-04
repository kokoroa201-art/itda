'use client'

import { useState } from 'react'

const NAV_LINKS = [
  { label: '서비스 소개',    href: '/about' },
  { label: '절차 가이드',    href: '/guide' },
  { label: '카테고리',       href: '/services' },
  { label: '자주 묻는 질문', href: '/faq' },
]

const QUICK_SITUATIONS = [
  { emoji: '🚨', label: '사망신고 해야 해요',       href: '/guide',                    desc: '순서 한눈에 보기' },
  { emoji: '🏦', label: '금융·계좌 정리해야 해요',  href: '/services?cat=financial',   desc: '은행·보험·연금' },
  { emoji: '📱', label: '통신 요금 끊어야 해요',    href: '/services?cat=telecom',     desc: '이동통신·인터넷' },
  { emoji: '📋', label: '뭐부터 할지 모르겠어요',   href: '/checklist',                desc: '전체 체크리스트' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-50 bg-white/96 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

            {/* 로고 */}
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

            {/* 모바일 우측: 바로시작 + 햄버거 */}
            <div className="md:hidden flex items-center gap-2">
              <a href="/services"
                className="px-4 py-2 text-xs font-bold text-white rounded-full"
                style={{ background: 'linear-gradient(135deg,#00C8A5,#0057B8)' }}>
                바로 시작
              </a>
              <button onClick={() => setMenuOpen(v => !v)}
                className="w-10 h-10 flex items-center justify-center rounded-xl text-gray-600 hover:bg-gray-50"
                aria-label="메뉴">
                <span className="text-xl leading-none">{menuOpen ? '✕' : '☰'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* 모바일 드롭다운 */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-4 py-5">

            {/* 상황 선택 — 가장 위에 */}
            <p className="text-xs font-bold text-gray-400 mb-3 uppercase tracking-widest">
              지금 상황을 선택하세요
            </p>
            <div className="grid grid-cols-2 gap-2 mb-5">
              {QUICK_SITUATIONS.map(s => (
                <a key={s.label} href={s.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2.5 p-3 rounded-xl border border-gray-100 bg-gray-50 hover:border-[#00C8A5]/50 hover:bg-[#00C8A5]/5 transition-all">
                  <span className="text-lg flex-shrink-0">{s.emoji}</span>
                  <div>
                    <div className="text-xs font-bold text-[#1A2035] leading-tight">{s.label}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{s.desc}</div>
                  </div>
                </a>
              ))}
            </div>

            {/* 구분선 */}
            <div className="border-t border-gray-100 mb-4" />

            {/* 일반 메뉴 */}
            <div className="space-y-1">
              {NAV_LINKS.map(l => (
                <a key={l.label} href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-2.5 px-2 text-sm font-medium text-gray-600 hover:text-[#0057B8] transition-colors">
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* 모바일 하단 고정 바 */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-white border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.07)]">
        <div className="grid grid-cols-4 h-16">
          {[
            { icon: '🔍', label: '절차 찾기',   href: '/services' },
            { icon: '📋', label: '체크리스트',  href: '/checklist' },
            { icon: '📖', label: '가이드',      href: '/guide' },
            { icon: '🤝', label: '전문가 연결', href: '/admin' },
          ].map(item => (
            <a key={item.label} href={item.href}
              className="flex flex-col items-center justify-center gap-1 text-gray-500 hover:text-[#007A68] active:bg-gray-50 transition-colors">
              <span className="text-xl leading-none">{item.icon}</span>
              <span className="text-[10px] font-semibold">{item.label}</span>
            </a>
          ))}
        </div>
      </div>
    </>
  )
}
