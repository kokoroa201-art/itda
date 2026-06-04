'use client'

import Link from 'next/link'

const VALUES = [
  {
    emoji: '🤝',
    title: '함께한다는 것',
    body: '정보를 전달하는 것에서 그치지 않습니다. 막막한 순간에 옆에 있는 사람처럼, 무엇을 어떻게 해야 할지 함께 생각합니다.',
  },
  {
    emoji: '🔍',
    title: '투명하게, 정확하게',
    body: '출처가 불분명한 정보는 싣지 않습니다. 공공기관과 공식 절차만을 기반으로, 믿을 수 있는 안내를 제공합니다.',
  },
  {
    emoji: '💙',
    title: '슬픔 앞에서 존중을',
    body: '이용자는 지금 인생에서 가장 힘든 시간을 보내고 있습니다. 모든 설계의 기준은 그 사람의 감정과 상황에 대한 존중입니다.',
  },
]

const STATS = [
  { num: '35+', label: '안내 가능 기관·서비스' },
  { num: '5',   label: '처리 단계 타임라인' },
  { num: '0원', label: '정보 찾기 비용' },
  { num: '3개월', label: '절차 완료 목표 기간' },
]

const HELPS = [
  { emoji: '🗺️', title: '무엇을 먼저 해야 하는지', body: '사망 당일부터 3개월까지, 해야 할 일의 순서를 타임라인으로 안내합니다.' },
  { emoji: '📋', title: '어디에 연락해야 하는지', body: '은행, 통신사, 보험, SNS 등 35개 이상 기관의 실제 신청 페이지로 직접 연결합니다.' },
  { emoji: '📄', title: '어떤 서류를 준비해야 하는지', body: '처리할 서비스를 선택하면, 필요한 서류 목록을 한 번에 정리해드립니다.' },
  { emoji: '⚖️', title: '혼자 처리하기 어려울 때', body: '법무사·세무사 연결, 서류 작성 도움 등 전문가 지원 서비스도 함께 제공합니다.' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* 상단 네비 */}
      <div className="border-b border-gray-100 bg-white">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors">
            ← 홈
          </Link>
          <Link href="/services"
            className="px-4 py-2 rounded-full text-sm font-bold text-white"
            style={{ background: 'linear-gradient(135deg,#00C8A5,#0057B8)' }}>
            서비스 보기
          </Link>
        </div>
      </div>

      {/* ── 1. 미션 히어로 ── */}
      <section className="py-24 px-4 text-center"
        style={{ background: 'linear-gradient(150deg,#0A1628 0%,#1A3A5C 100%)' }}>
        <div className="max-w-3xl mx-auto">
          <p className="text-sm font-bold mb-6" style={{ color: '#00C8A5', letterSpacing: '0.12em' }}>
            OUR MISSION
          </p>
          <h1 className="font-black text-white mb-8"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', lineHeight: 1.2, letterSpacing: '-0.03em' }}>
            가족을 잃은 슬픔 앞에서,<br />
            행정 절차가 또 다른 짐이<br />
            되어서는 안 됩니다.
          </h1>
          <p className="text-lg leading-relaxed max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.65)' }}>
            잇다는 대한민국에서 가족을 잃은 분들이<br />
            남겨진 일들을 조금 더 쉽게, 덜 외롭게 처리할 수 있도록<br />
            만들어진 플랫폼입니다.
          </p>
        </div>
      </section>

      {/* ── 2. 창업 스토리 ── */}
      <section className="py-20 px-4" style={{ backgroundColor: '#FAFAF8' }}>
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 items-start">

            {/* 인용 포인트 */}
            <div className="flex-shrink-0 lg:w-64">
              <div className="rounded-2xl p-6 text-center sticky top-24"
                style={{ background: 'linear-gradient(135deg,#EDFFF9,#EEF4FF)', border: '1px solid #D0F0E8' }}>
                <div className="text-5xl mb-3">💬</div>
                <p className="text-sm font-bold text-[#007A68] leading-relaxed">
                  "흩어진 정보를 찾아 헤매는 동안,<br />
                  슬픔을 추스를 시간조차 없었습니다."
                </p>
              </div>
            </div>

            {/* 스토리 본문 */}
            <div className="flex-1">
              <p className="text-xs font-bold text-gray-400 mb-3" style={{ letterSpacing: '0.1em' }}>
                WHY WE BUILT THIS
              </p>
              <h2 className="text-2xl font-black text-[#1A2035] mb-6" style={{ letterSpacing: '-0.03em' }}>
                직접 겪었기 때문에 만들었습니다
              </h2>

              <div className="space-y-5 text-gray-600 leading-relaxed" style={{ fontSize: '1rem' }}>
                <p>
                  가족을 잃고 나서 처음 부딪히는 것은 슬픔만이 아닙니다.
                  사망신고, 은행 계좌 해지, 통신 요금 처리, 각종 구독 서비스 해지,
                  보험금 청구, 상속 절차… 처리해야 할 일들이 끝도 없이 쏟아집니다.
                </p>
                <p>
                  하나를 처리하려면 다른 사이트를 찾아야 하고, 거기서 또 다른 기관으로
                  전화를 돌립니다. 전화를 받지 않으면 다음 날 다시 걸어야 합니다.
                  어떤 서류가 필요한지, 어디서 발급받는지, 무엇을 먼저 해야 하는지
                  알려주는 곳은 아무 데도 없었습니다.
                </p>
                <p className="font-semibold text-[#1A2035]">
                  슬픔을 추스를 시간조차 없이, 여기저기 헤매는 그 시간이 너무 억울했습니다.
                </p>
                <p>
                  그 경험이 잇다를 만든 이유입니다. 대한민국에서 가족을 잃은 분들이
                  적어도 '무엇을, 어떻게, 어디서'에 대한 답만큼은 한 곳에서 찾을 수 있도록.
                </p>
              </div>

              {/* 창업자 서명 스타일 */}
              <div className="mt-8 pt-6 border-t border-gray-200 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-black"
                  style={{ background: 'linear-gradient(135deg,#00C8A5,#0057B8)', fontSize: '1.2rem' }}>
                  잇
                </div>
                <div>
                  <p className="font-bold text-[#1A2035] text-sm">잇다 창업팀</p>
                  <p className="text-gray-400 text-xs mt-0.5">직접 이 길을 걸었던 사람들이 만든 서비스</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. 우리가 믿는 것 ── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-bold text-gray-400 mb-3" style={{ letterSpacing: '0.1em' }}>WHAT WE BELIEVE</p>
            <h2 className="text-2xl font-black text-[#1A2035]" style={{ letterSpacing: '-0.03em' }}>
              잇다가 지키는 원칙
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {VALUES.map((v, i) => (
              <div key={i} className="flex flex-col gap-4 p-6 rounded-2xl"
                style={{ backgroundColor: '#F8F7F4', border: '1px solid #EBEBEB' }}>
                <span className="text-4xl">{v.emoji}</span>
                <div>
                  <p className="font-bold text-[#1A2035] text-base mb-2" style={{ letterSpacing: '-0.02em' }}>
                    {v.title}
                  </p>
                  <p className="text-gray-500 text-sm leading-relaxed">{v.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. 구체적으로 무엇을 ── */}
      <section className="py-20 px-4" style={{ background: 'linear-gradient(150deg,#0A1628 0%,#0D2744 100%)' }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-bold mb-3" style={{ color: '#00C8A5', letterSpacing: '0.1em' }}>WHAT WE DO</p>
            <h2 className="text-2xl font-black text-white" style={{ letterSpacing: '-0.03em' }}>
              잇다가 도와드리는 것들
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {HELPS.map((h, i) => (
              <div key={i} className="flex items-start gap-4 p-5 rounded-2xl"
                style={{ backgroundColor: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ backgroundColor: 'rgba(0,200,165,0.15)' }}>
                  {h.emoji}
                </div>
                <div>
                  <p className="font-bold text-white text-sm mb-1.5" style={{ letterSpacing: '-0.02em' }}>
                    {h.title}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
                    {h.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* 통계 */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {STATS.map((s, i) => (
              <div key={i} className="text-center py-5 rounded-2xl"
                style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <p className="font-black text-2xl mb-1" style={{ color: '#00C8A5', letterSpacing: '-0.03em' }}>
                  {s.num}
                </p>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. 비전 (B2B 가능성 암시) ── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-bold text-gray-400 mb-3" style={{ letterSpacing: '0.1em' }}>OUR VISION</p>
            <h2 className="text-2xl font-black text-[#1A2035] mb-4" style={{ letterSpacing: '-0.03em' }}>
              앞으로 잇다가 만들어갈 것
            </h2>
            <p className="text-gray-500 text-base max-w-xl mx-auto leading-relaxed">
              지금은 정보를 한 곳에서 찾을 수 있게 하는 것에서 시작합니다.<br />
              그러나 잇다가 궁극적으로 꿈꾸는 것은 더 큽니다.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                phase: '지금',
                color: '#00C8A5',
                bg: '#E6F7F2',
                title: '한 곳에서 찾기',
                body: '흩어진 절차 정보를 하나의 플랫폼에서 확인하고, 공식 신청 페이지로 직접 이동합니다.',
              },
              {
                phase: '다음',
                color: '#0057B8',
                bg: '#EBF3FF',
                title: '기관과 연결하기',
                body: '보험사, 은행, 장례식장 등 기관과 협력해 사망 이후 절차를 더 빠르고 자동화된 방식으로 처리합니다.',
              },
              {
                phase: '미래',
                color: '#4A148C',
                bg: '#F3E5F5',
                title: '사회적 기반 만들기',
                body: '사망 이후 행정이 더 이상 개인이 홀로 감당해야 하는 짐이 아닌, 사회가 함께 나누는 구조를 만들어갑니다.',
              },
            ].map((v, i) => (
              <div key={i} className="flex items-start gap-5 p-5 rounded-2xl"
                style={{ backgroundColor: '#F8F7F4', border: '1px solid #EBEBEB' }}>
                <div className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-black mt-0.5"
                  style={{ backgroundColor: v.bg, color: v.color }}>
                  {v.phase}
                </div>
                <div>
                  <p className="font-bold text-[#1A2035] text-sm mb-1" style={{ letterSpacing: '-0.02em' }}>
                    {v.title}
                  </p>
                  <p className="text-gray-500 text-sm leading-relaxed">{v.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. 공감 강조 (Empathy 스타일 마무리) ── */}
      <section className="py-20 px-4" style={{ backgroundColor: '#F8F7F4' }}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-5xl mb-6">🕊️</div>
          <blockquote className="text-2xl font-black text-[#1A2035] mb-5 leading-snug"
            style={{ letterSpacing: '-0.03em' }}>
            "아무도 이 길을<br />혼자 걸어서는 안 됩니다."
          </blockquote>
          <p className="text-gray-500 text-base leading-relaxed max-w-lg mx-auto mb-10">
            잇다는 가족을 잃은 모든 분들 곁에 있겠습니다.<br />
            국적, 나이, 자산 규모에 관계없이, 필요한 사람이라면 누구에게나.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/guide"
              className="px-8 py-3.5 rounded-full text-white font-bold text-sm shadow-md hover:-translate-y-0.5 transition-all"
              style={{ background: 'linear-gradient(135deg,#00C8A5,#0057B8)' }}>
              지금 시작하기 →
            </Link>
            <Link href="/faq"
              className="px-8 py-3.5 rounded-full font-semibold text-sm border-2 border-gray-200 hover:border-[#00C8A5]/50 text-[#1A2035] transition-all">
              자주 묻는 질문
            </Link>
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="bg-[#010C26] py-8 px-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <img src="/img/itda_logo_black.png" alt="잇다" className="h-7 w-auto object-contain mb-2"
              onError={e => { e.currentTarget.style.display = 'none' }} />
            <p className="text-sm text-gray-500">흩어진 절차를, 한 곳으로 · © 2026 잇다</p>
          </div>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link href="/guide" className="hover:text-gray-300 transition-colors">절차 가이드</Link>
            <Link href="/services" className="hover:text-gray-300 transition-colors">서비스</Link>
            <Link href="/faq" className="hover:text-gray-300 transition-colors">FAQ</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}