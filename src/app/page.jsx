'use client'

import { useState } from 'react'
import ApplyModal from '../components/ApplyModal'

// NAV_LINKS는 Navbar 컴포넌트로 이동됨

const CATEGORIES = [
  { icon: '🏦', nodeL1: '금융',    nodeL2: '계좌',        title: '금융·계좌',        desc: '계좌 정리, 연금, 보험',     cat: 'financial' },
  { icon: '📱', nodeL1: '통신',    nodeL2: '요금',        title: '통신·요금',        desc: '이동통신, 인터넷, 요금제',  cat: 'telecom' },
  { icon: '🏛️', nodeL1: '정부24', nodeL2: '행정',        title: '정부24·행정',      desc: '상속, 사망신고, 행정절차',  cat: 'government' },
  { icon: '💬', nodeL1: 'SNS',     nodeL2: '디지털 계정', title: 'SNS·디지털 계정',  desc: '카카오, 네이버, 구글',      cat: 'sns' },
  { icon: '🔄', nodeL1: '구독',    nodeL2: '서비스 확인', title: '구독 서비스 확인', desc: '스트리밍, 쇼핑몰, 앱',      cat: 'subscription' },
  { icon: '📋', nodeL1: '상속',    nodeL2: '준비 서류',   title: '상속 준비 서류',   desc: '필요 서류 한눈에 확인',     cat: 'insurance' },
]

const TRUST = [
  { emoji: '🛡️', title: '신뢰할 수 있는 정보', desc: '공공기관·공식 기관 기반' },
  { emoji: '⏱️', title: '시간 절약',           desc: '여러 사이트 한 번에' },
  { emoji: '📄', title: '쉬운 절차 안내',       desc: '단계별로 쉽게 안내' },
  { emoji: '🔒', title: '개인정보 보호',        desc: '안심하고 이용할 수 있는 보안' },
]

function HubDiagram() {
  const [hoveredIdx, setHoveredIdx] = useState(null)
  const cx = 250, cy = 250, outerR = 168, innerR = 74

  const nodes = CATEGORIES.map((cat, i) => {
    const angle = (i * 60 - 90) * Math.PI / 180
    return {
      ...cat,
      x: Math.round(cx + outerR * Math.cos(angle)),
      y: Math.round(cy + outerR * Math.sin(angle)),
    }
  })

  return (
    <div className="relative w-full max-w-[460px] mx-auto select-none">
      <div className="absolute inset-0 rounded-full blur-3xl opacity-15 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #00C8A5 0%, #0057B8 100%)' }} />

      <svg viewBox="0 0 500 500" className="relative w-full drop-shadow-sm">
        <defs>
          <linearGradient id="centerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00C8A5" />
            <stop offset="100%" stopColor="#0057B8" />
          </linearGradient>
          <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00C8A5" />
            <stop offset="100%" stopColor="#0057B8" />
          </linearGradient>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00C8A5" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#0057B8" stopOpacity="0.4" />
          </linearGradient>
          <filter id="nodeShadow" x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow dx="0" dy="3" stdDeviation="5" floodColor="#00000015" />
          </filter>
          <filter id="nodeHoverShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="7" stdDeviation="14" floodColor="#00C8A545" />
          </filter>
          <filter id="centerShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="10" floodColor="#0057B830" />
          </filter>
        </defs>

        <circle cx={cx} cy={cy} r={outerR + 18}
          fill="none" stroke="#D8ECFF" strokeWidth="1.5" strokeDasharray="4,9" opacity="0.6" />

        {nodes.map((n, i) => (
          <line key={i} x1={cx} y1={cy} x2={n.x} y2={n.y}
            stroke="url(#lineGrad)" strokeWidth="1.5" strokeDasharray="6,5" opacity="0.6" />
        ))}

        {nodes.map((n, i) => {
          const mx = cx + (n.x - cx) * 0.55
          const my = cy + (n.y - cy) * 0.55
          return <circle key={i} cx={mx} cy={my} r={4.5} fill="url(#centerGrad)" opacity="0.7" />
        })}

        {nodes.map((n, i) => {
          const isHov = hoveredIdx === i
          const col = isHov ? '#007A68' : '#1A2035'
          return (
            <g key={i}
              filter={isHov ? 'url(#nodeHoverShadow)' : 'url(#nodeShadow)'}
              style={{
                cursor: 'pointer',
                transformOrigin: `${n.x}px ${n.y}px`,
                transform: isHov ? 'scale(1.22)' : 'scale(1)',
                transition: 'transform 0.22s cubic-bezier(0.34,1.56,0.64,1)',
              }}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              onClick={() => { window.location.href = `/services?cat=${n.cat}` }}
            >
              <circle cx={n.x} cy={n.y} r={46} fill="white"
                stroke={isHov ? 'url(#centerGrad)' : '#E5EFFF'}
                strokeWidth={isHov ? 2.5 : 1.5} />
              <text x={n.x} y={n.y - 13} textAnchor="middle"
                fontSize="22" dominantBaseline="middle">{n.icon}</text>
              <text x={n.x} y={n.y + 12} textAnchor="middle"
                fontSize="13.5" fill={col} fontWeight="800"
                fontFamily="'Pretendard', 'Noto Sans KR', sans-serif">
                {n.nodeL1}
              </text>
              <text x={n.x} y={n.y + 28} textAnchor="middle"
                fontSize="12" fill={col} fontWeight="700"
                fontFamily="'Pretendard', 'Noto Sans KR', sans-serif">
                {n.nodeL2}
              </text>
            </g>
          )
        })}

        <circle cx={cx} cy={cy} r={innerR + 10} fill="url(#ringGrad)" filter="url(#centerShadow)" />
        <circle cx={cx} cy={cy} r={innerR} fill="url(#centerGrad)" />
        <image
          href="/img/itda_logo_gradation.png"
          x={cx - 56} y={cy - 36}
          width="112" height="72"
          preserveAspectRatio="xMidYMid meet"
        />
      </svg>
    </div>
  )
}

export default function HomePage() {
  const [applyOpen, setApplyOpen] = useState(false)
  const [applyType, setApplyType] = useState('free')

  const openApply = (type = 'free') => { setApplyType(type); setApplyOpen(true) }

  return (
    <div className="min-h-screen bg-white">

      {/* ═══ HERO ═══ */}
      <section
        className="pt-24 min-h-screen flex items-center"
        style={{ background: 'linear-gradient(135deg, #EDFFF9 0%, #FFFFFF 45%, #EEF4FF 100%)' }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16">
          <div className="flex flex-col lg:flex-row lg:items-stretch gap-12 lg:gap-16">
            <div className="flex-1 min-w-0 flex flex-col justify-center text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#00C8A5]/40 shadow-sm mb-8">
                <span className="w-2 h-2 rounded-full bg-[#00C8A5] animate-pulse" />
                <span className="text-sm font-semibold text-[#007A68]" style={{ letterSpacing: '-0.01em' }}>
                  사망 이후 절차 안내 플랫폼
                </span>
              </div>

              <h1 className="font-black text-[#1A2035] mb-6"
                style={{ fontSize: 'clamp(2.4rem, 5vw, 3.5rem)', lineHeight: 1.1, letterSpacing: '-0.04em' }}>
                복잡한 절차,<br />
                <span className="gradient-text">한 곳에서 잇다</span>
              </h1>

              <p className="text-gray-500 mb-8"
                style={{ fontSize: '1.0625rem', lineHeight: 1.85, letterSpacing: '-0.01em' }}>
                흩어진 정보와 여러 사이트를 찾아다니지 마세요.
                사망 이후 필요한 절차와 기관을{' '}
                <strong className="text-[#1A2035] font-semibold">쉽고 빠르게 안내</strong>해드립니다.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <a href="/services"
                  className="inline-flex items-center justify-center gap-2 px-8 py-2.5 font-bold text-white rounded-full gradient-btn shadow-lg hover:opacity-95 hover:-translate-y-0.5 transition-all"
                  style={{ fontSize: '1rem', letterSpacing: '-0.01em' }}>
                  무료로 절차 찾기 →
                </a>
                <a href="/checklist"
                  className="inline-flex items-center justify-center gap-2 px-8 py-2.5 font-semibold text-[#1A2035] rounded-full bg-white border-2 border-gray-200 hover:border-[#00C8A5]/60 hover:-translate-y-0.5 transition-all"
                  style={{ fontSize: '1rem', letterSpacing: '-0.01em' }}>
                  서비스 둘러보기
                </a>
              </div>
            </div>

            <div className="flex-shrink-0 w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[440px] mx-auto lg:mx-0">
              <HubDiagram />
            </div>
          </div>

          <div className="mt-14 pt-10 border-t border-gray-100/80 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {TRUST.map((t, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-[#00C8A5]/15 to-[#0057B8]/15 flex items-center justify-center text-lg">
                  {t.emoji}
                </div>
                <div>
                  <div className="font-bold text-[#1A2035]"
                    style={{ fontSize: '0.875rem', letterSpacing: '-0.02em' }}>{t.title}</div>
                  <div className="text-gray-500 mt-0.5"
                    style={{ fontSize: '0.8rem', letterSpacing: '-0.01em', lineHeight: 1.5 }}>{t.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CATEGORY CARDS ═══ */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl sm:text-2xl font-black text-[#1A2035]" style={{ letterSpacing: '-0.03em' }}>
              필요한 절차를 빠르게 찾아보세요
            </h2>
            <a href="/services" className="text-sm font-semibold text-[#0057B8] hover:text-[#00C8A5] transition-colors">
              모든 카테고리 보기 →
            </a>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {CATEGORIES.map((cat, i) => (
              <a key={i} href={`/services?cat=${cat.cat}`}
                className="group flex flex-col items-center gap-3 p-5 rounded-2xl border-2 border-gray-100 bg-white text-center transition-all duration-200 hover:border-[#00C8A5]/50 hover:shadow-lg hover:-translate-y-1.5">
                <span className="text-4xl group-hover:scale-110 transition-transform duration-200">{cat.icon}</span>
                <div>
                  <div className="font-bold text-[#1A2035] group-hover:text-[#007A68] transition-colors"
                    style={{ fontSize: '0.875rem', letterSpacing: '-0.02em' }}>{cat.title}</div>
                  <div className="text-gray-400 mt-1" style={{ fontSize: '0.75rem', lineHeight: 1.4 }}>{cat.desc}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PAID BANNER ═══ */}
      <section className="py-16" style={{ background: 'linear-gradient(135deg, #0A1628 0%, #1A3A5C 100%)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left max-w-lg">
              <p className="text-sm font-semibold mb-3" style={{ color: '#00C8A5', letterSpacing: '0.05em' }}>
                혼자 처리하기 어려울 때
              </p>
              <h3 className="text-2xl font-black text-white mb-3" style={{ letterSpacing: '-0.03em' }}>
                아무도 이 길을<br />혼자 걸어서는 안 됩니다.
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">
                직접 처리하기 복잡한 절차는 전문가가 함께합니다.<br />
                서류 작성부터 법무사·세무사 연결까지.
              </p>
            </div>
            <div className="flex flex-col items-center gap-4 flex-shrink-0">
              <div className="grid grid-cols-3 gap-2 text-center">
                {[
                  { emoji: '📄', label: '서류 작성' },
                  { emoji: '⚖️', label: '법무사 연결' },
                  { emoji: '🧾', label: '세무사 연결' },
                ].map((s, i) => (
                  <div key={i} className="px-3 py-3 rounded-xl flex flex-col items-center gap-1"
                    style={{ backgroundColor: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <span className="text-xl">{s.emoji}</span>
                    <span className="text-white/60 text-xs font-medium">{s.label}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => openApply('consult')}
                className="w-full px-8 py-4 bg-white font-bold rounded-full shadow-xl hover:-translate-y-0.5 transition-all text-sm whitespace-nowrap"
                style={{ color: '#0A1628', letterSpacing: '-0.01em' }}>
                전문가 도움 요청하기 →
              </button>
              <p className="text-white/40 text-xs">접수 후 1영업일 내 연락드립니다</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="bg-[#010C26] py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between gap-8 mb-8">
            <div>
              <img src="/img/itda_logo_black.png" alt="잇다"
                className="h-7 w-auto object-contain mb-2"
                onError={e => { e.currentTarget.style.display = 'none' }} />
              <p className="text-sm text-gray-500 mt-1">흩어진 절차를, 한 곳으로</p>
              <p className="text-xs text-gray-600 mt-1">가족을 잃은 분들 곁에 있겠습니다.</p>
            </div>
            <div className="flex gap-12 text-sm">
              <div className="space-y-2">
                <p className="text-gray-400 font-semibold text-xs mb-3" style={{ letterSpacing: '0.08em' }}>서비스</p>
                <a href="/services" className="block text-gray-500 hover:text-gray-300 transition-colors">해지 안내</a>
                <a href="/checklist" className="block text-gray-500 hover:text-gray-300 transition-colors">체크리스트</a>
                <a href="/guide" className="block text-gray-500 hover:text-gray-300 transition-colors">절차 가이드</a>
              </div>
              <div className="space-y-2">
                <p className="text-gray-400 font-semibold text-xs mb-3" style={{ letterSpacing: '0.08em' }}>회사</p>
                <a href="/about" className="block text-gray-500 hover:text-gray-300 transition-colors">서비스 소개</a>
                <a href="/faq" className="block text-gray-500 hover:text-gray-300 transition-colors">자주 묻는 질문</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-gray-600">© 2026 잇다. All rights reserved.</p>
            <div className="flex gap-5 text-xs text-gray-600">
              <a href="#" className="hover:text-gray-400 transition-colors">이용약관</a>
              <a href="#" className="hover:text-gray-400 transition-colors">개인정보처리방침</a>
            </div>
          </div>
        </div>
      </footer>

      <ApplyModal
        open={applyOpen}
        onClose={() => setApplyOpen(false)}
        defaultType={applyType}
      />
    </div>
  )
}