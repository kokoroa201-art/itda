import { useState } from 'react'

/* ── 데이터 ── */
const CATEGORIES = [
  { icon: '🏦', nodeL1: '금융',    nodeL2: '계좌',       title: '금융·계좌',        desc: '계좌 정리, 연금, 보험' },
  { icon: '📱', nodeL1: '통신',    nodeL2: '요금',       title: '통신·요금',        desc: '이동통신, 인터넷, 요금제' },
  { icon: '🏛️', nodeL1: '정부24', nodeL2: '행정',       title: '정부24·행정',      desc: '상속, 사망신고, 행정절차' },
  { icon: '💬', nodeL1: 'SNS',     nodeL2: '디지털 계정', title: 'SNS·디지털 계정',  desc: '카카오, 네이버, 구글' },
  { icon: '🔄', nodeL1: '구독',    nodeL2: '서비스 확인', title: '구독 서비스 확인', desc: '스트리밍, 쇼핑몰, 앱' },
  { icon: '📋', nodeL1: '상속',    nodeL2: '준비 서류',  title: '상속 준비 서류',   desc: '필요 서류 한눈에 확인' },
]

const TRUST = [
  { emoji: '🛡️', title: '신뢰할 수 있는 정보', desc: '공공기관·공식 기관 기반' },
  { emoji: '⏱️', title: '시간 절약',           desc: '여러 사이트 한 번에' },
  { emoji: '📄', title: '쉬운 절차 안내',       desc: '단계별로 쉽게 안내' },
  { emoji: '🔒', title: '개인정보 보호',        desc: '안심하고 이용할 수 있는 보안' },
]

const NAV_LINKS = ['서비스 소개', '절차 가이드', '카테고리', '자주 묻는 질문', '고객센터']

/* ── Hub Diagram ── */
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
      {/* 배경 glow */}
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
          {/* 가운데 흰 원 그림자 */}
          <filter id="centerShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="10" floodColor="#0057B830" />
          </filter>
        </defs>

        {/* 바깥 점선 링 */}
        <circle cx={cx} cy={cy} r={outerR + 18}
          fill="none" stroke="#D8ECFF" strokeWidth="1.5" strokeDasharray="4,9" opacity="0.6" />

        {/* 연결선 */}
        {nodes.map((n, i) => (
          <line key={i} x1={cx} y1={cy} x2={n.x} y2={n.y}
            stroke="url(#lineGrad)" strokeWidth="1.5" strokeDasharray="6,5" opacity="0.6" />
        ))}

        {/* 선 위 점 */}
        {nodes.map((n, i) => {
          const mx = cx + (n.x - cx) * 0.55
          const my = cy + (n.y - cy) * 0.55
          return <circle key={i} cx={mx} cy={my} r={4.5} fill="url(#centerGrad)" opacity="0.7" />
        })}

        {/* ── 카테고리 노드 ── */}
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

        {/* ── 가운데 원: 그라디언트 링 + 흰 내원 + 그라디언트 로고 ── */}
        {/* 로고 그라디언트와 통일된 링 */}
        <circle cx={cx} cy={cy} r={innerR + 10} fill="url(#ringGrad)" filter="url(#centerShadow)" />
        {/* 흰 내원 (로고 컬러가 선명하게 보이도록) */}
        <circle cx={cx} cy={cy} r={innerR} fill="white" />
        {/* 그라디언트 로고 (새로 저장된 파일) */}
        <image
          href="/img/itda_logo_gradation.png"
          x={cx - 52} y={cy - 22}
          width="104" height="44"
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
    <div className="min-h-screen bg-white">

      {/* ═══ NAVBAR ═══ */}
      <nav className="fixed inset-x-0 top-0 z-50 bg-white/96 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* 로고: 화이트 메인 로고 */}
            <div className="flex-shrink-0">
              <img src="/img/itda_logo_White_main.png" alt="잇다"
                className="h-10 w-auto object-contain"
                onError={e => {
                  e.currentTarget.src = '/img/itda_logo_gradation.png'
                  e.currentTarget.onerror = null
                }}
              />
            </div>

            <div className="hidden md:flex items-center gap-7">
              {NAV_LINKS.map(link => (
                <a key={link} href="#"
                  className="text-sm font-medium text-gray-500 hover:text-[#0057B8] transition-colors"
                  style={{ letterSpacing: '-0.01em' }}>
                  {link}
                </a>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-3">
              <a href="#" className="text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors">로그인</a>
              <button className="px-5 py-2.5 text-sm font-bold text-white rounded-full gradient-btn shadow-md hover:opacity-90 transition-opacity"
                style={{ letterSpacing: '-0.01em' }}>
                무료로 절차 찾기
              </button>
            </div>

            <button onClick={() => setMenuOpen(v => !v)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl text-gray-600 hover:bg-gray-50"
              aria-label="메뉴">
              <span className="text-xl leading-none">{menuOpen ? '✕' : '☰'}</span>
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
              <a href="#" className="text-center text-sm text-gray-500 py-2">로그인</a>
              <button className="w-full py-3 text-sm font-bold text-white rounded-full gradient-btn">무료로 절차 찾기</button>
            </div>
          </div>
        )}
      </nav>

      {/* ═══ HERO ═══ */}
      <section
        className="pt-16 min-h-screen flex items-center"
        style={{ background: 'linear-gradient(135deg, #EDFFF9 0%, #FFFFFF 45%, #EEF4FF 100%)' }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">

          {/* ── 두 컬럼: items-center로 시각적 중심 정렬 ── */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-16">

            {/* 왼쪽: badge + H1 + 부제목 + 버튼 */}
            <div className="flex-1 min-w-0 text-center lg:text-left">

              {/* 배지 */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#00C8A5]/40 shadow-sm mb-8">
                <span className="w-2 h-2 rounded-full bg-[#00C8A5] animate-pulse" />
                <span className="text-sm font-semibold text-[#007A68]"
                  style={{ letterSpacing: '-0.01em' }}>
                  사망 이후 절차 안내 플랫폼
                </span>
              </div>

              {/* H1 */}
              <h1
                className="font-black text-[#1A2035] mb-6"
                style={{
                  fontSize: 'clamp(2.4rem, 5vw, 3.5rem)',
                  lineHeight: 1.1,
                  letterSpacing: '-0.04em',
                }}
              >
                복잡한 절차,<br />
                <span className="gradient-text">한 곳에서 잇다</span>
              </h1>

              {/* 부제목 */}
              <p
                className="text-gray-500 mb-10"
                style={{
                  fontSize: '1.0625rem',
                  lineHeight: 1.85,
                  letterSpacing: '-0.01em',
                  maxWidth: '26rem',
                  margin: '0 auto 2.5rem',
                }}
              >
                흩어진 정보와 여러 사이트를 찾아다니지 마세요.<br />
                사망 이후 필요한 절차와 기관을<br />
                <strong className="text-[#1A2035] font-semibold">쉽고 빠르게 안내</strong>해드립니다.
              </p>

              {/* CTA 버튼 */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <button
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 font-bold text-white rounded-full gradient-btn shadow-lg hover:opacity-95 hover:-translate-y-0.5 transition-all"
                  style={{ fontSize: '1rem', letterSpacing: '-0.01em' }}
                >
                  무료로 절차 찾기 →
                </button>
                <button
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold text-[#1A2035] rounded-full bg-white border-2 border-gray-200 hover:border-[#00C8A5]/60 hover:-translate-y-0.5 transition-all"
                  style={{ fontSize: '1rem', letterSpacing: '-0.01em' }}
                >
                  서비스 둘러보기
                </button>
              </div>
            </div>

            {/* 오른쪽: 허브 다이어그램 */}
            <div className="flex-shrink-0 w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[440px] mx-auto lg:mx-0">
              <HubDiagram />
            </div>
          </div>

          {/* ── Trust 스트립: 두 컬럼 아래 전체 너비 ── */}
          <div className="mt-14 pt-10 border-t border-gray-100/80 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {TRUST.map((t, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-[#00C8A5]/15 to-[#0057B8]/15 flex items-center justify-center text-lg">
                  {t.emoji}
                </div>
                <div>
                  <div className="font-bold text-[#1A2035]"
                    style={{ fontSize: '0.875rem', letterSpacing: '-0.02em' }}>
                    {t.title}
                  </div>
                  <div className="text-gray-500 mt-0.5"
                    style={{ fontSize: '0.8rem', letterSpacing: '-0.01em', lineHeight: 1.5 }}>
                    {t.desc}
                  </div>
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
            <h2 className="text-xl sm:text-2xl font-black text-[#1A2035]"
              style={{ letterSpacing: '-0.03em' }}>
              필요한 절차를 빠르게 찾아보세요
            </h2>
            <button className="text-sm font-semibold text-[#0057B8] hover:text-[#00C8A5] transition-colors">
              모든 카테고리 보기 →
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {CATEGORIES.map((cat, i) => (
              <button key={i}
                className="group flex flex-col items-center gap-3 p-5 rounded-2xl border-2 border-gray-100 bg-white text-center transition-all duration-200 hover:border-[#00C8A5]/50 hover:shadow-lg hover:-translate-y-1.5">
                <span className="text-4xl group-hover:scale-110 transition-transform duration-200">{cat.icon}</span>
                <div>
                  <div className="font-bold text-[#1A2035] group-hover:text-[#007A68] transition-colors"
                    style={{ fontSize: '0.875rem', letterSpacing: '-0.02em' }}>
                    {cat.title}
                  </div>
                  <div className="text-gray-400 mt-1"
                    style={{ fontSize: '0.75rem', lineHeight: 1.4 }}>
                    {cat.desc}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PAID BANNER ═══ */}
      <section className="py-14"
        style={{ background: 'linear-gradient(135deg, #00C8A5 0%, #0057B8 100%)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <p className="text-white/80 text-base font-medium mb-2"
                style={{ letterSpacing: '-0.01em' }}>혼자 진행하기 어렵다면</p>
              <h3 className="text-2xl font-black text-white"
                style={{ letterSpacing: '-0.03em' }}>전문가가 직접 도와드립니다</h3>
              <p className="text-white/70 text-base mt-2"
                style={{ letterSpacing: '-0.01em' }}>필요한 절차를 처음부터 끝까지 함께 진행합니다</p>
            </div>
            <div className="flex items-center gap-5 flex-shrink-0">
              <div className="text-right">
                <div className="text-white/60 text-sm line-through mb-0.5">100,000원</div>
                <div className="text-white text-3xl font-black"
                  style={{ letterSpacing: '-0.03em' }}>
                  39,000<span className="text-base font-bold ml-0.5">원</span>
                </div>
              </div>
              <button className="px-7 py-4 bg-white text-[#0057B8] text-base font-bold rounded-full shadow-xl hover:bg-blue-50 hover:-translate-y-0.5 transition-all whitespace-nowrap"
                style={{ letterSpacing: '-0.01em' }}>
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

    </div>
  )
}
