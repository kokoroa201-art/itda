import { useState } from 'react'

/* ── 데이터 ── */
// nodeL1 / nodeL2: 허브 다이어그램용 두 줄 표시 (둘 다 굵게)
const CATEGORIES = [
  { icon: '🏦', nodeL1: '금융',      nodeL2: '계좌',      title: '금융·계좌',       desc: '계좌 정리, 연금, 보험' },
  { icon: '📱', nodeL1: '통신',      nodeL2: '요금',      title: '통신·요금',       desc: '이동통신, 인터넷, 요금제' },
  { icon: '🏛️', nodeL1: '정부24',   nodeL2: '행정',      title: '정부24·행정',     desc: '상속, 사망신고, 행정절차' },
  { icon: '💬', nodeL1: 'SNS',       nodeL2: '디지털 계정', title: 'SNS·디지털 계정', desc: '카카오, 네이버, 구글' },
  { icon: '🔄', nodeL1: '구독',      nodeL2: '서비스 확인', title: '구독 서비스 확인', desc: '스트리밍, 쇼핑몰, 앱' },
  { icon: '📋', nodeL1: '상속',      nodeL2: '준비 서류', title: '상속 준비 서류',  desc: '필요 서류 한눈에 확인' },
]

const TRUST = [
  { emoji: '🛡️', title: '신뢰할 수 있는 정보', desc: '공공기관·공식 기관 기반' },
  { emoji: '⏱️', title: '시간 절약',         desc: '여러 사이트를 찾을 필요 없이' },
  { emoji: '📄', title: '쉬운 절차 안내',     desc: '단계별로 쉽게 안내' },
  { emoji: '🔒', title: '개인정보 보호',      desc: '안심하고 이용할 수 있는 보안' },
]

const NAV_LINKS = ['서비스 소개', '절차 가이드', '카테고리', '자주 묻는 질문', '고객센터']

/* ── Hub Diagram ── */
function HubDiagram() {
  const [hoveredIdx, setHoveredIdx] = useState(null)
  const cx = 250, cy = 250, outerR = 168, innerR = 72

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
          <filter id="nodeShadow" x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow dx="0" dy="3" stdDeviation="5" floodColor="#00000018" />
          </filter>
          <filter id="nodeHoverShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="7" stdDeviation="14" floodColor="#00C8A550" />
          </filter>
          <filter id="centerGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="8" result="blur" />
            <feFlood floodColor="#00C8A5" floodOpacity="0.3" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Outer dashed ring */}
        <circle cx={cx} cy={cy} r={outerR + 18} fill="none" stroke="#E0F0FF" strokeWidth="1.5" strokeDasharray="4,9" opacity="0.7" />

        {/* Connection lines */}
        {nodes.map((n, i) => (
          <line key={i} x1={cx} y1={cy} x2={n.x} y2={n.y}
            stroke="url(#lineGrad)" strokeWidth="1.5" strokeDasharray="6,5" opacity="0.6" />
        ))}

        {/* Dot accents */}
        {nodes.map((n, i) => {
          const mx = cx + (n.x - cx) * 0.55
          const my = cy + (n.y - cy) * 0.55
          return <circle key={i} cx={mx} cy={my} r={5} fill="url(#centerGrad)" opacity="0.75" />
        })}

        {/* ── 카테고리 노드 ── */}
        {nodes.map((n, i) => {
          const isHovered = hoveredIdx === i
          const textColor = isHovered ? '#007A68' : '#1A2035'
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
              {/* 노드 원 */}
              <circle
                cx={n.x} cy={n.y} r={46}
                fill="white"
                stroke={isHovered ? 'url(#centerGrad)' : '#E8F0FE'}
                strokeWidth={isHovered ? 2.5 : 1.5}
              />
              {/* 아이콘 */}
              <text x={n.x} y={n.y - 14} textAnchor="middle" fontSize="22" dominantBaseline="middle">
                {n.icon}
              </text>
              {/* 첫 번째 줄 — 굵고 진하게 */}
              <text
                x={n.x} y={n.y + 12}
                textAnchor="middle"
                fontSize="13"
                fill={textColor}
                fontWeight="800"
                fontFamily="'Noto Sans KR', sans-serif"
              >
                {n.nodeL1}
              </text>
              {/* 두 번째 줄 — 똑같이 굵고 진하게 (회색 없음) */}
              <text
                x={n.x} y={n.y + 28}
                textAnchor="middle"
                fontSize="12"
                fill={textColor}
                fontWeight="700"
                fontFamily="'Noto Sans KR', sans-serif"
              >
                {n.nodeL2}
              </text>
            </g>
          )
        })}

        {/* ── 가운데 원 ── */}
        <circle cx={cx} cy={cy} r={innerR + 7} fill="white" opacity="0.22" />
        <circle cx={cx} cy={cy} r={innerR} fill="url(#centerGrad)" filter="url(#centerGlow)" />
        <circle cx={cx} cy={cy} r={innerR} fill="white" fillOpacity="0.06" />

        {/* 가운데 로고만 (더 크게, 텍스트 없음) */}
        <image
          href="/img/itda_logo_White_main.png"
          x={cx - 58} y={cy - 30}
          width="116" height="60"
          preserveAspectRatio="xMidYMid meet"
        />
      </svg>
    </div>
  )
}

/* ── Main App ── */
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* ═══ NAVBAR ═══ */}
      <nav className="fixed inset-x-0 top-0 z-50 bg-white/96 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            <div className="flex-shrink-0">
              <img src="/img/itda_logo_gradation.png" alt="잇다" className="h-9 object-contain"
                onError={e => { e.currentTarget.style.display = 'none' }} />
            </div>

            <div className="hidden md:flex items-center gap-7">
              {NAV_LINKS.map(link => (
                <a key={link} href="#"
                  className="text-sm font-medium text-gray-600 hover:text-[#0057B8] transition-colors duration-150">
                  {link}
                </a>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-3">
              <a href="#" className="text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors">
                로그인
              </a>
              <button className="px-5 py-2.5 text-sm font-bold text-white rounded-full gradient-btn shadow-md hover:opacity-90 transition-opacity">
                무료로 절차 찾기
              </button>
            </div>

            <button
              onClick={() => setMenuOpen(v => !v)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl text-gray-600 hover:bg-gray-50 transition-colors"
              aria-label="메뉴"
            >
              {menuOpen ? <span className="text-xl leading-none">✕</span> : <span className="text-xl leading-none">☰</span>}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-1">
            {NAV_LINKS.map(link => (
              <a key={link} href="#"
                className="block py-2.5 text-sm font-medium text-gray-700 border-b border-gray-50 last:border-0">
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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 xl:gap-20">

            {/* ── 텍스트 영역 ── */}
            <div className="flex-1 min-w-0 max-w-xl mx-auto lg:mx-0 text-center lg:text-left">

              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#00C8A5]/40 shadow-sm mb-7">
                <span className="w-2 h-2 rounded-full bg-[#00C8A5] inline-block animate-pulse" />
                <span className="text-sm font-bold text-[#007A68]">사망 이후 절차 안내 플랫폼</span>
              </div>

              {/* H1 */}
              <h1 className="text-[2.6rem] sm:text-5xl lg:text-[3.4rem] font-black text-[#1A2035] leading-[1.13] tracking-tight mb-6">
                복잡한 절차,<br />
                <span className="gradient-text">한 곳에서 잇다</span>
              </h1>

              {/* Subtitle — 50+ 고려, 충분히 크게 */}
              <p className="text-[17px] sm:text-lg text-gray-500 leading-relaxed mb-10 max-w-md mx-auto lg:mx-0">
                흩어진 정보와 여러 사이트를 찾아다니지 마세요.<br />
                사망 이후 필요한 절차와 기관을<br />
                <span className="text-[#1A2035] font-semibold">쉽고 빠르게 안내</span>해드립니다.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-12">
                <button className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-white rounded-full gradient-btn shadow-lg hover:shadow-xl hover:opacity-95 hover:-translate-y-0.5 transition-all duration-200">
                  무료로 절차 찾기 →
                </button>
                <button className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-[#1A2035] rounded-full bg-white border-2 border-gray-200 hover:border-[#00C8A5]/60 hover:-translate-y-0.5 transition-all duration-200">
                  서비스 둘러보기
                </button>
              </div>

              {/* Trust grid — 50+ 고려, 텍스트 크게 */}
              <div className="grid grid-cols-2 gap-x-5 gap-y-5 max-w-[460px] mx-auto lg:mx-0">
                {TRUST.map((t, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-[#00C8A5]/15 to-[#0057B8]/15 flex items-center justify-center text-lg">
                      {t.emoji}
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-bold text-[#1A2035] leading-snug">{t.title}</div>
                      <div className="text-[13px] text-gray-500 leading-snug mt-0.5">{t.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── 허브 다이어그램 ── */}
            <div className="flex-shrink-0 w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[420px] xl:max-w-[460px]">
              <HubDiagram />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CATEGORY CARDS ═══ */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl sm:text-2xl font-black text-[#1A2035]">
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
                className="group flex flex-col items-center gap-3 p-5 sm:p-6 rounded-2xl border-2 border-gray-100 bg-white text-center transition-all duration-200 hover:border-[#00C8A5]/50 hover:shadow-lg hover:-translate-y-1.5"
              >
                <span className="text-4xl group-hover:scale-110 transition-transform duration-200">
                  {cat.icon}
                </span>
                <div>
                  <div className="text-[14px] font-bold text-[#1A2035] group-hover:text-[#007A68] transition-colors leading-snug">
                    {cat.title}
                  </div>
                  <div className="text-[12px] text-gray-400 mt-1 leading-snug">
                    {cat.desc}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PAID BANNER ═══ */}
      <section className="py-14" style={{ background: 'linear-gradient(135deg, #00C8A5 0%, #0057B8 100%)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <p className="text-white/80 text-base font-medium mb-2">혼자 진행하기 어렵다면</p>
              <h3 className="text-2xl font-black text-white">전문가가 직접 도와드립니다</h3>
              <p className="text-white/70 text-base mt-2">필요한 절차를 처음부터 끝까지 함께 진행합니다</p>
            </div>
            <div className="flex items-center gap-5 flex-shrink-0">
              <div className="text-right">
                <div className="text-white/60 text-sm line-through mb-0.5">100,000원</div>
                <div className="text-white text-3xl font-black tracking-tight">39,000<span className="text-base font-bold ml-0.5">원</span></div>
              </div>
              <button className="px-7 py-4 bg-white text-[#0057B8] text-base font-bold rounded-full shadow-xl hover:bg-blue-50 hover:shadow-2xl hover:-translate-y-0.5 transition-all whitespace-nowrap">
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
            <img src="/img/itda_logo_White_main.png" alt="잇다" className="h-7 object-contain mb-2"
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

    </div>
  )
}
