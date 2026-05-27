import { useState } from 'react'

/* ── 데이터 ── */
const CATEGORIES = [
  { icon: '🏦', title: '금융·계좌', desc: '계좌 정리, 연금, 보험' },
  { icon: '📱', title: '통신·요금', desc: '이동통신, 인터넷, 요금제' },
  { icon: '🏛️', title: '정부24·행정', desc: '상속, 사망신고, 행정절차' },
  { icon: '💬', title: 'SNS·디지털 계정', desc: '카카오, 네이버, 구글' },
  { icon: '🔄', title: '구독 서비스 확인', desc: '스트리밍, 쇼핑몰, 앱' },
  { icon: '📋', title: '상속 준비 서류', desc: '필요 서류 한눈에 확인' },
]

const TRUST = [
  { emoji: '🛡️', title: '신뢰할 수 있는 정보', desc: '공공기관 및 공식 기관 기반' },
  { emoji: '⏱️', title: '시간 절약', desc: '여러 사이트를 찾을 필요 없이' },
  { emoji: '📄', title: '쉬운 절차 안내', desc: '누구나 이해하기 쉬운 단계별 가이드' },
  { emoji: '🔒', title: '안전한 개인정보 보호', desc: '안심하고 이용할 수 있는 보안' },
]

const NAV_LINKS = ['서비스 소개', '절차 가이드', '카테고리', '자주 묻는 질문', '고객센터']

/* ── Hub Diagram (SVG) ── */
function HubDiagram() {
  const [hoveredIdx, setHoveredIdx] = useState(null)
  const cx = 250, cy = 250, outerR = 168, innerR = 70

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
      {/* Glow bg */}
      <div
        className="absolute inset-0 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #00C8A5 0%, #0057B8 100%)' }}
      />

      <svg viewBox="0 0 500 500" className="relative w-full drop-shadow-sm">
        <defs>
          <linearGradient id="centerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00C8A5" />
            <stop offset="100%" stopColor="#0057B8" />
          </linearGradient>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00C8A5" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#0057B8" stopOpacity="0.5" />
          </linearGradient>
          {/* 일반 노드 그림자 */}
          <filter id="nodeShadow" x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow dx="0" dy="3" stdDeviation="5" floodColor="#00000018" />
          </filter>
          {/* 호버 노드 그림자 (민트 glow) */}
          <filter id="nodeHoverShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="6" stdDeviation="14" floodColor="#00C8A555" />
          </filter>
          {/* 센터 glow */}
          <filter id="centerGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="8" result="blur" />
            <feFlood floodColor="#00C8A5" floodOpacity="0.3" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          {/* 텍스트 그림자 (center label용) */}
          <filter id="textGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#00000040" />
          </filter>
        </defs>

        {/* Outer dashed ring */}
        <circle
          cx={cx} cy={cy} r={outerR + 18}
          fill="none" stroke="#E0F0FF" strokeWidth="1.5"
          strokeDasharray="4,9" opacity="0.7"
        />

        {/* Connection lines */}
        {nodes.map((n, i) => (
          <line
            key={i}
            x1={cx} y1={cy} x2={n.x} y2={n.y}
            stroke="url(#lineGrad)"
            strokeWidth="1.5"
            strokeDasharray="6,5"
            opacity="0.6"
          />
        ))}

        {/* Dot accents on lines */}
        {nodes.map((n, i) => {
          const mx = cx + (n.x - cx) * 0.55
          const my = cy + (n.y - cy) * 0.55
          return <circle key={i} cx={mx} cy={my} r={5} fill="url(#centerGrad)" opacity="0.75" />
        })}

        {/* ── Category nodes ── */}
        {nodes.map((n, i) => {
          const isHovered = hoveredIdx === i
          return (
            <g
              key={i}
              filter={isHovered ? 'url(#nodeHoverShadow)' : 'url(#nodeShadow)'}
              style={{
                cursor: 'pointer',
                transformOrigin: `${n.x}px ${n.y}px`,
                transform: isHovered ? 'scale(1.22)' : 'scale(1)',
                transition: 'transform 0.22s cubic-bezier(0.34,1.56,0.64,1)',
              }}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              {/* Node circle */}
              <circle
                cx={n.x} cy={n.y} r={44}
                fill="white"
                stroke={isHovered ? 'url(#centerGrad)' : '#E8F0FE'}
                strokeWidth={isHovered ? 2.5 : 1.5}
              />
              {/* Icon */}
              <text
                x={n.x} y={n.y - 11}
                textAnchor="middle"
                fontSize="22"
                dominantBaseline="middle"
              >
                {n.icon}
              </text>
              {/* 카테고리 제목 (앞부분) */}
              <text
                x={n.x} y={n.y + 14}
                textAnchor="middle"
                fontSize="12"
                fill={isHovered ? '#007A68' : '#1A2035'}
                fontWeight="700"
                fontFamily="'Noto Sans KR', sans-serif"
              >
                {n.title.split('·')[0]}
              </text>
              {/* 카테고리 부제 (뒷부분) */}
              <text
                x={n.x} y={n.y + 29}
                textAnchor="middle"
                fontSize="10"
                fill="#9CA3AF"
                fontFamily="'Noto Sans KR', sans-serif"
              >
                {n.title.includes('·')
                  ? `·${n.title.split('·')[1]}`
                  : (n.title.split(' ').slice(1).join(' ') || '')}
              </text>
            </g>
          )
        })}

        {/* ── Center circle ── */}
        <circle cx={cx} cy={cy} r={innerR + 7} fill="white" opacity="0.22" />
        <circle cx={cx} cy={cy} r={innerR} fill="url(#centerGrad)" filter="url(#centerGlow)" />
        <circle cx={cx} cy={cy} r={innerR} fill="white" fillOpacity="0.06" />

        {/* Center logo */}
        <image
          href="/img/itda_logo_White_main.png"
          x={cx - 50} y={cy - 28}
          width="100" height="56"
          preserveAspectRatio="xMidYMid meet"
        />

        {/* Center label — 배경 pill + 흰 텍스트 */}
        <rect
          x={cx - 44} y={cy + 33}
          width="88" height="22"
          rx="11"
          fill="rgba(0,0,0,0.22)"
        />
        <text
          x={cx} y={cy + 48}
          textAnchor="middle"
          fontSize="11.5"
          fill="white"
          fontWeight="700"
          fontFamily="'Noto Sans KR', sans-serif"
          filter="url(#textGlow)"
        >
          절차 연결 플랫폼
        </text>
      </svg>
    </div>
  )
}

/* ── Main App ── */
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    /* max-w-screen-xl = 1280px, 초대형 화면도 중앙 정렬 */
    <div className="min-h-screen bg-white font-sans">

      {/* ═══ NAVBAR ═══ */}
      <nav className="fixed inset-x-0 top-0 z-50 bg-white/96 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <div className="flex-shrink-0">
              <img
                src="/img/itda_logo_gradation.png"
                alt="잇다"
                className="h-9 object-contain"
                onError={e => { e.currentTarget.style.display = 'none' }}
              />
            </div>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-7">
              {NAV_LINKS.map(link => (
                <a
                  key={link}
                  href="#"
                  className="text-sm font-medium text-gray-600 hover:text-[#0057B8] transition-colors duration-150"
                >
                  {link}
                </a>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <a href="#" className="text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors">
                로그인
              </a>
              <button className="px-5 py-2.5 text-sm font-bold text-white rounded-full gradient-btn shadow-md hover:opacity-90 transition-opacity">
                무료로 절차 찾기
              </button>
            </div>

            {/* Mobile menu btn */}
            <button
              onClick={() => setMenuOpen(v => !v)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl text-gray-600 hover:bg-gray-50 transition-colors"
              aria-label="메뉴"
            >
              {menuOpen
                ? <span className="text-xl leading-none">✕</span>
                : <span className="text-xl leading-none">☰</span>
              }
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-1">
            {NAV_LINKS.map(link => (
              <a
                key={link}
                href="#"
                className="block py-2.5 text-sm font-medium text-gray-700 border-b border-gray-50 last:border-0"
              >
                {link}
              </a>
            ))}
            <div className="pt-3 flex flex-col gap-2">
              <a href="#" className="text-center text-sm font-medium text-gray-500 py-2">로그인</a>
              <button className="w-full py-3 text-sm font-bold text-white rounded-full gradient-btn shadow-md">
                무료로 절차 찾기
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* ═══ HERO ═══ */}
      <section
        className="pt-16 min-h-screen flex items-center"
        style={{ background: 'linear-gradient(135deg, #F0FFFD 0%, #FFFFFF 50%, #EEF4FF 100%)' }}
      >
        {/* max-w-6xl = 1152px — 초대형 화면에서도 중앙에 고정 */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 xl:gap-20">

            {/* ── Left: Text ── */}
            <div className="flex-1 min-w-0 max-w-xl mx-auto lg:mx-0 text-center lg:text-left">

              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#00C8A5]/40 shadow-sm mb-7">
                <span className="w-2 h-2 rounded-full bg-[#00C8A5] inline-block animate-pulse" />
                <span className="text-xs font-bold text-[#007A68]">사망 이후 절차 안내 플랫폼</span>
              </div>

              {/* H1 */}
              <h1 className="text-[2.6rem] sm:text-5xl lg:text-[3.4rem] font-black text-[#1A2035] leading-[1.13] tracking-tight mb-5">
                복잡한 절차,<br />
                <span className="gradient-text">한 곳에서 잇다</span>
              </h1>

              {/* Subtitle */}
              <p className="text-[15px] sm:text-base text-gray-500 leading-loose mb-9 max-w-md mx-auto lg:mx-0">
                흩어진 정보와 여러 사이트를 찾아다니지 마세요.
                <br />
                사망 이후 필요한 절차와 기관을
                <br />
                <span className="text-[#1A2035] font-semibold">쉽고 빠르게 안내</span>해드립니다.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-10">
                <button className="inline-flex items-center justify-center gap-2 px-8 py-4 text-[15px] font-bold text-white rounded-full gradient-btn shadow-lg hover:shadow-xl hover:opacity-95 hover:-translate-y-0.5 transition-all duration-200">
                  무료로 절차 찾기
                  <span className="text-lg">→</span>
                </button>
                <button className="inline-flex items-center justify-center gap-2 px-8 py-4 text-[15px] font-bold text-[#1A2035] rounded-full bg-white border-2 border-gray-200 hover:border-[#00C8A5]/60 hover:-translate-y-0.5 transition-all duration-200">
                  서비스 둘러보기
                </button>
              </div>

              {/* Trust grid */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-3.5 max-w-[420px] mx-auto lg:mx-0">
                {TRUST.map((t, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-[#00C8A5]/15 to-[#0057B8]/15 flex items-center justify-center text-base">
                      {t.emoji}
                    </div>
                    <div className="text-left">
                      <div className="text-xs font-bold text-[#1A2035] leading-snug">{t.title}</div>
                      <div className="text-[11px] text-gray-400 leading-snug mt-0.5">{t.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right: Hub Diagram ── */}
            <div className="flex-shrink-0 w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[420px] xl:max-w-[460px]">
              <HubDiagram />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CATEGORY CARDS ═══ */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-7">
            <h2 className="text-lg sm:text-xl font-black text-[#1A2035]">
              필요한 절차를 빠르게 찾아보세요
            </h2>
            <button className="text-sm font-semibold text-[#0057B8] hover:text-[#00C8A5] transition-colors flex items-center gap-1">
              모든 카테고리 보기 →
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {CATEGORIES.map((cat, i) => (
              <button
                key={i}
                className="group flex flex-col items-center gap-3 p-4 sm:p-5 rounded-2xl border-2 border-gray-100 bg-white text-center transition-all duration-200 hover:border-[#00C8A5]/50 hover:shadow-lg hover:-translate-y-1.5"
              >
                <span className="text-3xl group-hover:scale-110 transition-transform duration-200">
                  {cat.icon}
                </span>
                <div>
                  <div className="text-[13px] font-bold text-[#1A2035] group-hover:text-[#007A68] transition-colors leading-snug">
                    {cat.title}
                  </div>
                  <div className="text-[11px] text-gray-400 mt-1 leading-snug">
                    {cat.desc}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PAID BANNER ═══ */}
      <section
        className="py-12"
        style={{ background: 'linear-gradient(135deg, #00C8A5 0%, #0057B8 100%)' }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <p className="text-white/75 text-sm font-medium mb-1.5">혼자 진행하기 어렵다면</p>
              <h3 className="text-2xl font-black text-white">
                전문가가 직접 도와드립니다
              </h3>
              <p className="text-white/65 text-sm mt-1.5">
                필요한 절차를 처음부터 끝까지 함께 진행합니다
              </p>
            </div>
            <div className="flex items-center gap-5 flex-shrink-0">
              <div className="text-right">
                <div className="text-white/60 text-xs line-through mb-0.5">100,000원</div>
                <div className="text-white text-3xl font-black tracking-tight">39,000<span className="text-base font-bold ml-0.5">원</span></div>
              </div>
              <button className="px-7 py-3.5 bg-white text-[#0057B8] text-sm font-bold rounded-full shadow-xl hover:bg-blue-50 hover:shadow-2xl hover:-translate-y-0.5 transition-all whitespace-nowrap">
                도움 요청하기 →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="bg-[#1A2035] py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <img
              src="/img/itda_logo_White_main.png"
              alt="잇다"
              className="h-7 object-contain mb-2"
              onError={e => { e.currentTarget.style.display = 'none' }}
            />
            <p className="text-xs text-gray-500">흩어진 절차를, 한 곳으로 · © 2026 잇다</p>
          </div>
          <div className="flex gap-5 text-xs text-gray-500">
            <a href="#" className="hover:text-gray-300 transition-colors">이용약관</a>
            <a href="#" className="hover:text-gray-300 transition-colors">개인정보처리방침</a>
            <a href="#" className="hover:text-gray-300 transition-colors">고객센터</a>
          </div>
        </div>
      </footer>

    </div>
  )
}
