'use client'

import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">

      <div className="border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link href="/" className="text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors">← 홈</Link>
        </div>
      </div>

      {/* ── HERO ── */}
      <section style={{ background: 'linear-gradient(150deg,#EDFFF9 0%,#fff 50%,#EEF4FF 100%)' }} className="py-16 px-4">
        <div className="max-w-4xl mx-auto flex flex-col lg:flex-row items-center gap-10">
          <div className="flex-1 text-center lg:text-left">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-5"
              style={{ backgroundColor:'#E6F7F2', color:'#00875A' }}>
              사망 이후 절차 안내 플랫폼
            </span>
            <h1 className="text-4xl font-black text-[#1A2035] mb-4" style={{ letterSpacing:'-0.04em', lineHeight:1.15 }}>
              복잡한 절차,<br />
              <span style={{ background:'linear-gradient(135deg,#00C8A5,#0057B8)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
                한 곳에서 잇다
              </span>
            </h1>
            <p className="text-gray-500 text-base leading-relaxed mb-8 max-w-md mx-auto lg:mx-0">
              가족을 잃은 후 처리해야 할 일들이 막막하게 쏟아집니다.<br />
              잇다가 무엇을, 어떤 순서로, 어디서 해야 하는지 알려드립니다.
            </p>
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <Link href="/guide"
                className="px-6 py-3 rounded-full text-white font-bold text-sm shadow-md hover:-translate-y-0.5 transition-all"
                style={{ background:'linear-gradient(135deg,#00C8A5,#0057B8)' }}>
                절차 가이드 보기 →
              </Link>
              <Link href="/services"
                className="px-6 py-3 rounded-full font-semibold text-sm border-2 border-gray-200 hover:border-[#00C8A5]/60 transition-all text-[#1A2035]">
                서비스 목록 보기
              </Link>
            </div>
          </div>

          {/* 비주얼: 처리 기관 아이콘 클러스터 */}
          <div className="flex-shrink-0 w-72">
            <div className="relative">
              {/* 중앙 */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full shadow-lg flex items-center justify-center z-10"
                  style={{ background:'linear-gradient(135deg,#00C8A5,#0057B8)' }}>
                  <img src="/img/itda_logo_gradation.png" alt="잇다" className="w-10 h-6 object-contain"
                    onError={e => { e.currentTarget.style.display='none' }} />
                </div>
              </div>
              {/* 주변 아이콘들 */}
              {[
                { emoji:'🏛️', label:'정부24',  top:'0%',   left:'38%' },
                { emoji:'🏦', label:'은행',    top:'22%',  left:'72%' },
                { emoji:'📱', label:'통신',    top:'65%',  left:'72%' },
                { emoji:'💬', label:'SNS',     top:'80%',  left:'38%' },
                { emoji:'🔄', label:'구독',    top:'65%',  left:'4%'  },
                { emoji:'🛡️', label:'보험',   top:'22%',  left:'4%'  },
              ].map((n, i) => (
                <div key={i} className="absolute flex flex-col items-center gap-1"
                  style={{ top:n.top, left:n.left }}>
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-md flex items-center justify-center text-2xl border border-gray-100">
                    {n.emoji}
                  </div>
                  <span className="text-xs font-semibold text-gray-500">{n.label}</span>
                </div>
              ))}
              <div className="h-64" />
            </div>
          </div>
        </div>
      </section>

      {/* ── 문제 ── */}
      <section className="py-14 bg-white px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-bold text-gray-400 text-center mb-2" style={{ letterSpacing:'0.08em' }}>THE PROBLEM</p>
          <h2 className="text-2xl font-black text-[#1A2035] text-center mb-10" style={{ letterSpacing:'-0.03em' }}>
            지금 이런 상황이신가요?
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { emoji:'😰', bg:'#FFF3E0', title:'정보가 너무 흩어져 있어요',  body:'은행·통신사·정부기관·SNS…\n처리해야 할 곳이 수십 군데입니다.' },
              { emoji:'😓', bg:'#FFEBEE', title:'어디서 시작해야 할지 모르겠어요', body:'뭘 먼저 해야 하는지,\n어떤 서류가 필요한지 아무도 알려주지 않습니다.' },
              { emoji:'🕐', bg:'#EEF4FF', title:'시간이 너무 걸려요',          body:'하나씩 찾다 보면 며칠이 지나도\n끝이 보이지 않습니다.' },
            ].map((p, i) => (
              <div key={i} className="rounded-2xl p-6 flex flex-col gap-3" style={{ backgroundColor: p.bg }}>
                <span className="text-4xl">{p.emoji}</span>
                <p className="font-bold text-[#1A2035] text-sm" style={{ letterSpacing:'-0.02em' }}>{p.title}</p>
                <p className="text-gray-500 text-xs leading-relaxed whitespace-pre-line">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 해결책 ── */}
      <section className="py-14 px-4" style={{ backgroundColor:'#F8F7F4' }}>
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-bold text-gray-400 text-center mb-2" style={{ letterSpacing:'0.08em' }}>THE SOLUTION</p>
          <h2 className="text-2xl font-black text-[#1A2035] text-center mb-10" style={{ letterSpacing:'-0.03em' }}>
            잇다가 한 번에 해결해드립니다
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { emoji:'🗺️', title:'단계별 절차 가이드',   body:'사망 직후부터 3개월까지, 언제 무엇을 해야 하는지 타임라인으로 안내합니다.' },
              { emoji:'📋', title:'35개+ 기관 한눈에',     body:'은행, 통신, 정부, SNS, 보험, 구독까지 모든 기관을 한 화면에서 확인합니다.' },
              { emoji:'🔗', title:'실제 신청 페이지 직접 연결', body:'각 기관의 해지·신청 페이지로 바로 이동해 불필요한 검색 시간을 줄입니다.' },
              { emoji:'✅', title:'체크리스트로 진행 관리', body:'처리한 항목을 체크하며 빠진 것 없이 진행 상황을 관리할 수 있습니다.' },
            ].map((f, i) => (
              <div key={i} className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-gray-100">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ background:'linear-gradient(135deg,#EDFFF9,#EEF4FF)' }}>
                  {f.emoji}
                </div>
                <div>
                  <p className="font-bold text-[#1A2035] text-sm mb-1" style={{ letterSpacing:'-0.02em' }}>{f.title}</p>
                  <p className="text-gray-400 text-xs leading-relaxed">{f.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 숫자로 보는 잇다 ── */}
      <section className="py-14 bg-white px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-black text-[#1A2035] text-center mb-10" style={{ letterSpacing:'-0.03em' }}>
            숫자로 보는 잇다
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { num:'35+', unit:'개', label:'안내 서비스' },
              { num:'6',   unit:'개', label:'처리 카테고리' },
              { num:'0', unit:'원', label:'정보 찾기 비용' },
              { num:'3',   unit:'단계', label:'간단한 이용 방법' },
            ].map((s, i) => (
              <div key={i} className="text-center p-6 rounded-2xl border border-gray-100">
                <p className="font-black text-[#1A2035]" style={{ fontSize:'2.2rem', letterSpacing:'-0.04em', lineHeight:1 }}>
                  <span style={{ background:'linear-gradient(135deg,#00C8A5,#0057B8)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
                    {s.num}
                  </span>
                  <span className="text-xl text-gray-400 font-bold ml-0.5">{s.unit}</span>
                </p>
                <p className="text-sm text-gray-500 mt-2 font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 이용 방법 ── */}
      <section className="py-14 px-4" style={{ background:'linear-gradient(135deg,#00C8A5 0%,#0057B8 100%)' }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-black text-white text-center mb-10" style={{ letterSpacing:'-0.03em' }}>
            3단계로 시작하세요
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { n:'1', emoji:'🗺️', title:'절차 가이드 확인',  body:'무엇을 먼저 해야 하는지\n순서와 타임라인을 확인합니다.', href:'/guide', btn:'가이드 보기' },
              { n:'2', emoji:'✅', title:'서비스 체크리스트', body:'해당하는 기관을 선택해\n진행 현황을 관리합니다.', href:'/checklist', btn:'체크리스트 열기' },
              { n:'3', emoji:'🔗', title:'공식 페이지 신청',  body:'각 기관의 실제 신청 페이지로\n바로 이동해 처리합니다.', href:'/services', btn:'서비스 목록' },
            ].map((s, i) => (
              <div key={i} className="bg-white/15 rounded-2xl p-6 flex flex-col gap-3 backdrop-blur-sm border border-white/20">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/30 flex items-center justify-center font-black text-white text-sm">
                    {s.n}
                  </div>
                  <span className="text-2xl">{s.emoji}</span>
                </div>
                <p className="font-bold text-white text-sm" style={{ letterSpacing:'-0.02em' }}>{s.title}</p>
                <p className="text-white/70 text-xs leading-relaxed whitespace-pre-line flex-1">{s.body}</p>
                <Link href={s.href}
                  className="mt-1 inline-flex items-center gap-1 text-white font-bold text-xs hover:text-white/80 transition-colors">
                  {s.btn} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-[#010C26] py-6 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-gray-500">흩어진 절차를, 한 곳으로 · © 2026 잇다</p>
        </div>
      </footer>
    </div>
  )
}