'use client'

import { useState } from 'react'
import ApplyModal from '../components/ApplyModal'
import { CATEGORIES } from '../data/services'

const NAV_LINKS = [
  { label: '무료 절차 안내', href: '/services' },
  { label: '자주 묻는 질문', href: '#faq' },
  { label: '고객센터',       href: '#' },
]

const TRUST = [
  { emoji: '🛡️', title: '신뢰할 수 있는 정보', desc: '공공기관·공식 기관 기반' },
  { emoji: '⏱️', title: '시간 절약',           desc: '여러 사이트 한 번에' },
  { emoji: '📄', title: '쉬운 절차 안내',       desc: '단계별로 쉽게 안내' },
  { emoji: '🔒', title: '개인정보 보호',        desc: '안심하고 이용 가능' },
]

const SERVICE_CATS = CATEGORIES.filter(c => c.id !== 'all')

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [applyOpen, setApplyOpen] = useState(false)
  const [applyType, setApplyType] = useState('free')

  const openApply = (type = 'free') => { setApplyType(type); setApplyOpen(true) }

  return (
    <div className="min-h-screen bg-white">

      {/* ── NAVBAR ── */}
      <nav className="fixed inset-x-0 top-0 z-50 bg-white/96 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
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

            <div className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map(l => (
                <a key={l.label} href={l.href}
                  className="text-sm font-medium text-gray-500 hover:text-[#0057B8] transition-colors"
                  style={{ letterSpacing: '-0.01em' }}>
                  {l.label}
                </a>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-3">
              <button onClick={() => openApply('premium')}
                className="text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors">
                전문가 도움
              </button>
              <a href="/services"
                className="px-5 py-2.5 text-sm font-bold text-white rounded-full gradient-btn shadow-md hover:opacity-90 transition-opacity"
                style={{ letterSpacing: '-0.01em' }}>
                무료 절차 찾기
              </a>
            </div>

            <button onClick={() => setMenuOpen(v => !v)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl text-gray-600 hover:bg-gray-50">
              <span className="text-xl leading-none">{menuOpen ? '✕' : '☰'}</span>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-1">
            {NAV_LINKS.map(l => (
              <a key={l.label} href={l.href}
                className="block py-2.5 text-sm font-medium text-gray-700 border-b border-gray-50 last:border-0">
                {l.label}
              </a>
            ))}
            <div className="pt-3 flex flex-col gap-2">
              <a href="/services"
                className="w-full py-3 text-sm font-bold text-white rounded-full gradient-btn text-center">
                무료 절차 찾기
              </a>
              <button onClick={() => { setMenuOpen(false); openApply('premium') }}
                className="w-full py-3 text-sm font-semibold text-[#0057B8] rounded-full border-2 border-[#0057B8]/30">
                전문가 도움 받기
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section
        className="pt-20 min-h-screen flex items-center"
        style={{ background: 'linear-gradient(150deg, #EDFFF9 0%, #FFFFFF 50%, #EEF4FF 100%)' }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
          <div className="max-w-xl mx-auto lg:mx-0 text-center lg:text-left">

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#00C8A5]/40 shadow-sm mb-8">
              <span className="w-2 h-2 rounded-full bg-[#00C8A5] animate-pulse" />
              <span className="text-sm font-semibold text-[#007A68]" style={{ letterSpacing: '-0.01em' }}>
                사망 이후 절차 안내 플랫폼
              </span>
            </div>

            <h1 className="font-black text-[#1A2035] mb-5"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 3.4rem)', lineHeight: 1.15, letterSpacing: '-0.04em' }}>
              힘드실 때,<br />
              <span className="gradient-text">잇다가 함께합니다</span>
            </h1>

            <p className="text-gray-500 mb-10"
              style={{ fontSize: '1.05rem', lineHeight: 1.85, letterSpacing: '-0.01em' }}>
              가족을 잃은 후 처리해야 할 절차들이 막막하실 거예요.<br />
              금융, 통신, 정부 처리까지{' '}
              <strong className="text-[#1A2035] font-semibold">단계별로 쉽게 안내</strong>해드립니다.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-12">
              <a href="/services"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 font-bold text-white rounded-full gradient-btn shadow-lg hover:opacity-95 hover:-translate-y-0.5 transition-all"
                style={{ fontSize: '1rem', letterSpacing: '-0.01em' }}>
                무료로 절차 확인하기 →
              </a>
              <button onClick={() => openApply('premium')}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold text-[#1A2035] rounded-full bg-white border-2 border-gray-200 hover:border-[#00C8A5]/60 hover:-translate-y-0.5 transition-all"
                style={{ fontSize: '1rem', letterSpacing: '-0.01em' }}>
                전문가 도움 받기
              </button>
            </div>

            {/* 카테고리 바로가기 */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
              {SERVICE_CATS.map(cat => (
                <a key={cat.id} href={`/services?cat=${cat.id}`}
                  className="flex flex-col items-center gap-1.5 py-3.5 px-2 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-[#00C8A5]/40 transition-all">
                  <span className="text-xl">{cat.emoji}</span>
                  <span className="text-xs font-semibold text-gray-600 text-center leading-tight"
                    style={{ letterSpacing: '-0.01em' }}>
                    {cat.label}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 신뢰 지표 ── */}
      <section className="py-14 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {TRUST.map((t, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-[#00C8A5]/15 to-[#0057B8]/15 flex items-center justify-center text-lg">
                  {t.emoji}
                </div>
                <div>
                  <div className="font-bold text-[#1A2035]"
                    style={{ fontSize: '0.875rem', letterSpacing: '-0.02em' }}>{t.title}</div>
                  <div className="text-gray-500 mt-0.5"
                    style={{ fontSize: '0.78rem', lineHeight: 1.5 }}>{t.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 유료 배너 ── */}
      <section className="py-14" style={{ background: 'linear-gradient(135deg, #00C8A5 0%, #0057B8 100%)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <p className="text-white/80 text-base font-medium mb-2">혼자 진행하기 어렵다면</p>
              <h3 className="text-2xl font-black text-white" style={{ letterSpacing: '-0.03em' }}>
                전문가가 직접 도와드립니다
              </h3>
              <p className="text-white/70 text-base mt-2">필요한 절차를 처음부터 끝까지 함께 진행합니다</p>
            </div>
            <div className="flex items-center gap-5 flex-shrink-0">
              <div className="text-right">
                <div className="text-white/60 text-sm line-through mb-0.5">100,000원</div>
                <div className="text-white text-3xl font-black" style={{ letterSpacing: '-0.03em' }}>
                  39,000<span className="text-base font-bold ml-0.5">원</span>
                </div>
              </div>
              <button onClick={() => openApply('premium')}
                className="px-7 py-4 bg-white text-[#0057B8] text-base font-bold rounded-full shadow-xl hover:bg-blue-50 hover:-translate-y-0.5 transition-all whitespace-nowrap">
                도움 요청하기 →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#010C26] py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <img src="/img/itda_logo_black.png" alt="잇다"
              className="h-7 w-auto object-contain mb-2"
              onError={e => { e.currentTarget.style.display = 'none' }} />
            <p className="text-sm text-gray-500">흩어진 절차를, 한 곳으로 · © 2026 잇다</p>
          </div>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-gray-300 transition-colors">이용약관</a>
            <a href="#" className="hover:text-gray-300 transition-colors">개인정보처리방침</a>
            <a href="#" className="hover:text-gray-300 transition-colors">고객센터</a>
          </div>
        </div>
      </footer>

      <ApplyModal open={applyOpen} onClose={() => setApplyOpen(false)} defaultType={applyType} />
    </div>
  )
}