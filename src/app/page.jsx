'use client'

import { useState } from 'react'
import ApplyModal from '../components/ApplyModal'

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

const STATS = [
  { num: '14곳', label: '처리해야 할 평균 기관 수', sub: '은행·보험·통신·행정 등' },
  { num: '3개월', label: '절차 마무리까지 평균 기간', sub: '혼자 처리할 경우' },
  { num: '78%', label: '정보 부족으로 어려움을 겪는 유족', sub: '복지부 조사 기준' },
  { num: '23종', label: '처음 처리 시 필요한 최소 서류', sub: '기관별 중복 제출 포함' },
]

const STEPS = [
  {
    num: '01',
    icon: '🔍',
    title: '필요한 절차 찾기',
    desc: '금융·통신·행정·SNS 등 상황에 맞는 카테고리를 선택하면 관련 절차가 한눈에 정리되어 나옵니다.',
  },
  {
    num: '02',
    icon: '📋',
    title: '단계별 안내 따라가기',
    desc: '어떤 서류가 필요한지, 어디에 신청해야 하는지 순서대로 안내해드립니다. 처음이라도 괜찮아요.',
  },
  {
    num: '03',
    icon: '🤝',
    title: '필요하면 전문가 연결',
    desc: '혼자 처리하기 어려운 절차는 서류 작성 도움 또는 법무사·세무사 연결 서비스를 이용할 수 있어요.',
  },
]

const REVIEWS = [
  {
    name: '박○○',
    location: '서울',
    role: '40대 자영업',
    text: '아버지가 돌아가신 날, 상조 회사 전화를 끊고 나서 너무 막막했어요. 뭘 어디서부터 해야 할지. 잇다 덕분에 3일 만에 전체 절차를 파악하고 차근차근 처리할 수 있었습니다.',
  },
  {
    name: '이○○',
    location: '대구',
    role: '50대 직장인',
    text: '어머니 명의 통신요금이 계속 나가는 걸 6개월 뒤에야 알았어요. 잇다에 해지 안내가 다 정리되어 있더라고요. 진작에 알았다면 좋았을 텐데. 이런 서비스가 꼭 필요했습니다.',
  },
  {
    name: '정○○',
    location: '부산',
    role: '30대 회사원',
    text: '법무사 선생님과 연결해주셔서 상속 포기 절차까지 도움받았어요. 혼자였으면 어떻게 했을지 모르겠어요. 바쁜 와중에도 전화 한 통으로 처리되니 정말 감사했습니다.',
  },
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
    <div className="min-h-screen bg-white pb-16 md:pb-0">

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

              {/* 상황 선택 — 빠른 진입 */}
              <div className="mt-7">
                <p className="text-xs font-bold text-gray-400 mb-3 text-center lg:text-left"
                  style={{ letterSpacing: '0.06em' }}>
                  지금 상황을 선택하면 바로 이동해요
                </p>
                <div className="grid grid-cols-2 gap-2 max-w-sm mx-auto lg:mx-0">
                  {[
                    { emoji: '🚨', label: '사망신고 해야 해요',     href: '/guide' },
                    { emoji: '🏦', label: '금융·계좌 정리해야 해요', href: '/services?cat=financial' },
                    { emoji: '📱', label: '통신 요금 끊어야 해요',   href: '/services?cat=telecom' },
                    { emoji: '📋', label: '뭐부터 할지 모르겠어요',  href: '/checklist' },
                  ].map((s, i) => (
                    <a key={i} href={s.href}
                      className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border-2 border-gray-100 bg-white hover:border-[#00C8A5]/60 hover:bg-[#00C8A5]/5 hover:-translate-y-0.5 transition-all group">
                      <span className="text-base flex-shrink-0">{s.emoji}</span>
                      <span className="text-xs font-semibold text-gray-600 group-hover:text-[#007A68] leading-tight transition-colors">
                        {s.label}
                      </span>
                    </a>
                  ))}
                </div>
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

      {/* ═══ STATS ═══ */}
      <section className="py-20" style={{ background: 'linear-gradient(135deg, #0A1628 0%, #0E2240 100%)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold mb-3" style={{ color: '#00C8A5', letterSpacing: '0.06em' }}>
              대한민국 유족이 마주하는 현실
            </p>
            <h2 className="text-2xl sm:text-3xl font-black text-white" style={{ letterSpacing: '-0.03em' }}>
              슬픔을 추스르기도 전에<br />
              <span style={{ color: '#00C8A5' }}>서류부터 챙겨야 했습니다</span>
            </h2>
            <p className="text-white/50 mt-4 text-sm leading-relaxed">
              사망신고 후 처리해야 할 일들은 생각보다 훨씬 많고 복잡합니다.<br />
              대부분의 유족이 아무런 안내 없이 홀로 이 과정을 감당하고 있습니다.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map((s, i) => (
              <div key={i}
                className="rounded-2xl p-6 text-center"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)' }}>
                <div className="font-black mb-2"
                  style={{
                    fontSize: 'clamp(2rem, 4vw, 2.8rem)',
                    letterSpacing: '-0.04em',
                    background: 'linear-gradient(90deg, #00C8A5, #4DA8FF)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}>
                  {s.num}
                </div>
                <div className="text-white/80 font-semibold text-sm leading-snug mb-2"
                  style={{ letterSpacing: '-0.02em' }}>
                  {s.label}
                </div>
                <div className="text-white/30 text-xs">{s.sub}</div>
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

      {/* ═══ STORY ═══ */}
      <section className="py-20" style={{ background: '#F8F9FB' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">

            {/* 왼쪽: 감성 메시지 */}
            <div className="flex-1">
              <p className="text-sm font-semibold mb-4" style={{ color: '#00C8A5', letterSpacing: '0.06em' }}>
                이런 경험이 있으신가요?
              </p>
              <h2 className="text-2xl sm:text-3xl font-black text-[#1A2035] mb-6 leading-snug"
                style={{ letterSpacing: '-0.03em' }}>
                "어디서부터 시작해야 할지<br />아무도 알려주지 않았어요"
              </h2>
              <div className="space-y-4 text-gray-500 text-sm leading-relaxed"
                style={{ letterSpacing: '-0.01em' }}>
                <p>
                  가족을 잃은 충격이 채 가시기도 전에, 사망신고부터 시작해 은행·보험사·통신사·건강보험공단을
                  각각 직접 방문해야 한다는 사실을 알고 계셨나요?
                </p>
                <p>
                  기관마다 요구하는 서류가 다르고, 처리 순서가 잘못되면 다시 처음부터 해야 하는 경우도 있습니다.
                  많은 분들이 이 과정에서 실수를 하거나, 몇 달이 지나서야 빠뜨린 절차를 발견하기도 합니다.
                </p>
                <p className="text-[#1A2035] font-semibold">
                  잇다는 이 여정을 혼자 걷지 않도록 처음부터 끝까지 함께합니다.
                </p>
              </div>
            </div>

            {/* 오른쪽: 절차 카드들 */}
            <div className="flex-shrink-0 w-full max-w-sm">
              <div className="space-y-3">
                {[
                  { icon: '📍', title: '사망신고', agency: '주민센터', status: '3일 이내 신고 필수', color: '#FF6B6B' },
                  { icon: '🏦', title: '금융 계좌 정리', agency: '은행·증권·보험사', status: '상속인 확인 후 진행', color: '#00C8A5' },
                  { icon: '📱', title: '통신 서비스 해지', agency: '이동통신 3사', status: '요금 자동이체 주의', color: '#0057B8' },
                  { icon: '🏛️', title: '건강보험 자격 상실', agency: '국민건강보험공단', status: '14일 이내 신고', color: '#9B59B6' },
                  { icon: '💼', title: '국민연금 사망 신고', agency: '국민연금공단', status: '유족연금 수령 가능', color: '#F39C12' },
                ].map((item, i) => (
                  <div key={i}
                    className="flex items-center gap-4 bg-white rounded-xl px-4 py-3.5 shadow-sm border border-gray-100"
                    style={{ transform: `translateX(${i % 2 === 0 ? '0' : '12px'})` }}>
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                      style={{ background: `${item.color}15` }}>
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-[#1A2035] text-sm"
                        style={{ letterSpacing: '-0.02em' }}>{item.title}</div>
                      <div className="text-gray-400 text-xs truncate">{item.agency}</div>
                    </div>
                    <div className="text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0"
                      style={{ background: `${item.color}15`, color: item.color }}>
                      {item.status}
                    </div>
                  </div>
                ))}
                <div className="text-center text-xs text-gray-400 pt-1">
                  + 총 35개 이상의 절차가 안내됩니다
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold mb-3" style={{ color: '#00C8A5', letterSpacing: '0.06em' }}>
              이용 방법
            </p>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1A2035]" style={{ letterSpacing: '-0.03em' }}>
              세 단계로 시작하세요
            </h2>
            <p className="text-gray-400 mt-3 text-sm">회원가입 없이 무료로 이용할 수 있습니다</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 relative">
            {/* 연결선 (데스크탑) */}
            <div className="hidden sm:block absolute top-10 left-1/3 right-1/3 h-px"
              style={{ background: 'linear-gradient(90deg, #00C8A5, #0057B8)', opacity: 0.3 }} />

            {STEPS.map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center group">
                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl shadow-md group-hover:-translate-y-1 transition-transform duration-200"
                    style={{ background: 'linear-gradient(135deg, #EDFFF9, #EEF4FF)' }}>
                    {step.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-black"
                    style={{ background: 'linear-gradient(135deg, #00C8A5, #0057B8)' }}>
                    {i + 1}
                  </div>
                </div>
                <h3 className="font-black text-[#1A2035] mb-3 text-base" style={{ letterSpacing: '-0.02em' }}>
                  {step.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed" style={{ letterSpacing: '-0.01em' }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a href="/guide"
              className="inline-flex items-center gap-2 px-8 py-3 font-bold text-white rounded-full shadow-lg hover:-translate-y-0.5 transition-all"
              style={{ background: 'linear-gradient(90deg, #00C8A5, #0057B8)', fontSize: '0.9375rem' }}>
              전체 가이드 보기 →
            </a>
          </div>
        </div>
      </section>

      {/* ═══ REVIEWS ═══ */}
      <section className="py-20" style={{ background: 'linear-gradient(135deg, #F0FDF9 0%, #EEF4FF 100%)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold mb-3" style={{ color: '#00C8A5', letterSpacing: '0.06em' }}>
              실제 이용 후기
            </p>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1A2035]" style={{ letterSpacing: '-0.03em' }}>
              혼자가 아니었습니다
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {REVIEWS.map((r, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col">
                {/* 별점 */}
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className="w-4 h-4" viewBox="0 0 20 20" fill="#00C8A5">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-5"
                  style={{ letterSpacing: '-0.01em' }}>
                  "{r.text}"
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, #00C8A5, #0057B8)' }}>
                    {r.name[0]}
                  </div>
                  <div>
                    <div className="font-bold text-[#1A2035] text-sm">{r.name}</div>
                    <div className="text-gray-400 text-xs">{r.location} · {r.role}</div>
                  </div>
                </div>
              </div>
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
