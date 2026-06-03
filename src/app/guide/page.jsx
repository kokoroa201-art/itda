import Link from 'next/link'

const PHASES = [
  {
    phase: '즉시',
    period: '사망 당일',
    color: '#C62828',
    bg: '#FFEBEE',
    border: '#FFCDD2',
    steps: [
      {
        emoji: '🏥',
        title: '사망진단서 발급',
        body: '병원에서 사망진단서를 발급받습니다. 원본 여러 장을 미리 준비하세요. (기관별로 원본을 요구합니다)',
        tip: '원본 5~10장 준비 권장',
      },
      {
        emoji: '👨‍👩‍👧',
        title: '가족 연락 및 역할 분담',
        body: '상속인 중 대표자를 정하고, 처리할 업무를 나눠 담당합니다.',
        tip: '상속인 전원 연락 필요',
      },
    ],
  },
  {
    phase: '3일 이내',
    period: '장례 전후',
    color: '#E65100',
    bg: '#FFF3E0',
    border: '#FFE0B2',
    steps: [
      {
        emoji: '📋',
        title: '사망신고',
        body: '가까운 주민센터 또는 정부24 온라인으로 신고합니다. 사망일로부터 1개월 이내 의무입니다.',
        link: '/services/gov24',
        linkLabel: '정부24 사망신고',
        tip: '1개월 내 신고 의무',
      },
      {
        emoji: '🏦',
        title: '은행 계좌 사전 확인',
        body: '사망 신고 전 긴급히 필요한 생활비 등을 준비해두세요. 사망 신고 후 계좌가 동결될 수 있습니다.',
        tip: '사망신고 전에 미리 확인',
      },
    ],
  },
  {
    phase: '1주일 이내',
    period: '장례 후',
    color: '#1565C0',
    bg: '#E3F2FD',
    border: '#BBDEFB',
    steps: [
      {
        emoji: '🏥',
        title: '건강보험 자격 상실 신고',
        body: '국민건강보험공단에 사망을 신고합니다. 정부24 원스톱 서비스로 함께 처리할 수 있습니다.',
        link: '/services/nhis',
        linkLabel: '건강보험 신고',
        tip: '과납 보험료 환급 가능',
      },
      {
        emoji: '📮',
        title: '국민연금 사망 신고',
        body: '유족연금 또는 사망일시금을 신청할 수 있습니다. 지급 기준은 가입 기간에 따라 다릅니다.',
        link: '/services/nps',
        linkLabel: '유족연금 신청',
        tip: '유족연금 수급 여부 확인',
      },
      {
        emoji: '📱',
        title: '통신 회선 해지 또는 명의이전',
        body: '피상속인 명의의 이동통신 회선을 해지하거나 유족 명의로 이전합니다.',
        link: '/services/skt',
        linkLabel: '통신 해지 안내',
        tip: '사망일 이후 요금 환급 가능',
      },
    ],
  },
  {
    phase: '1개월 이내',
    period: '주요 자산 정리',
    color: '#2E7D32',
    bg: '#E8F5E9',
    border: '#C8E6C9',
    steps: [
      {
        emoji: '🔗',
        title: '상속 원스톱 서비스 신청',
        body: '정부24에서 금융·통신·연금 등 모든 상속 처리를 한 번에 신청할 수 있습니다.',
        link: '/services/gov24',
        linkLabel: '정부24 원스톱 신청',
        tip: '가장 효율적인 방법',
        highlight: true,
      },
      {
        emoji: '🏦',
        title: '은행 계좌 조회 및 해지',
        body: '금융감독원 상속인 금융거래 통합조회로 모든 은행 계좌를 한 번에 확인하고 처리합니다.',
        link: '/services/kb',
        linkLabel: '금감원 통합조회',
        tip: '전 금융기관 한 번에 조회',
      },
      {
        emoji: '💬',
        title: 'SNS·디지털 계정 정리',
        body: '카카오, 네이버, 구글, 인스타그램 등 디지털 계정을 삭제하거나 추모 계정으로 전환합니다.',
        link: '/services/kakao',
        linkLabel: '카카오 처리 안내',
        tip: '카카오페이 잔액 환급 가능',
      },
      {
        emoji: '🔄',
        title: '구독 서비스 해지',
        body: '넷플릭스, 쿠팡, 멜론 등 자동결제되는 구독 서비스를 해지해 불필요한 요금 청구를 막습니다.',
        link: '/services/netflix',
        linkLabel: '구독 해지 안내',
        tip: '자동결제 즉시 중단 요청',
      },
    ],
  },
  {
    phase: '3개월 이내',
    period: '법적 절차',
    color: '#4A148C',
    bg: '#F3E5F5',
    border: '#E1BEE7',
    steps: [
      {
        emoji: '⚖️',
        title: '상속 포기 또는 한정승인 결정',
        body: '부채가 재산보다 많은 경우 상속 포기 또는 한정승인을 법원에 신청할 수 있습니다. 사망 후 3개월 내에만 가능합니다.',
        link: 'https://www.scourt.go.kr',
        linkLabel: '법원 상속 포기 신청',
        tip: '3개월 지나면 자동 승인',
        warning: '기한 내 처리 필수',
      },
      {
        emoji: '🛡️',
        title: '보험금 청구',
        body: '생명보험, 손해보험 등 가입된 보험의 사망보험금을 청구합니다. 가입 보험이 있는지 먼저 조회하세요.',
        link: '/services/samsung-life',
        linkLabel: '보험금 청구 안내',
        tip: '보험금 청구 소멸시효 3년',
      },
      {
        emoji: '🏡',
        title: '부동산·차량 명의이전',
        body: '부동산과 차량이 있는 경우 상속인 명의로 이전 등기합니다. 법무사나 변호사의 도움을 받는 것이 좋습니다.',
        tip: '법무사·변호사 조력 권장',
      },
    ],
  },
]

export default function GuidePage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8F7F4' }}>

      {/* 상단 바 */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors">← 홈</Link>
          <Link href="/checklist"
            className="px-4 py-2 rounded-full text-sm font-bold text-white"
            style={{ background: 'linear-gradient(135deg,#00C8A5,#0057B8)' }}>
            체크리스트 열기
          </Link>
        </div>
      </div>

      {/* 헤더 */}
      <div className="bg-white border-b border-gray-100 px-4 py-10">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-bold text-gray-400 mb-2" style={{ letterSpacing: '0.08em' }}>STEP BY STEP</p>
          <h1 className="text-3xl font-black text-[#1A2035] mb-3" style={{ letterSpacing: '-0.04em' }}>
            절차 가이드
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed">
            사망 후 처리해야 할 일들을 시간 순서대로 정리했습니다.<br />
            순서를 지키면 빠뜨리는 것 없이 처리할 수 있습니다.
          </p>

          {/* 단계 요약 칩 */}
          <div className="flex flex-wrap gap-2 mt-5">
            {PHASES.map((p, i) => (
              <a key={i} href={`#phase-${i}`}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-colors hover:opacity-80"
                style={{ backgroundColor: p.bg, color: p.color, borderColor: p.border }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: p.color }} />
                {p.phase}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* 타임라인 */}
      <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        {PHASES.map((phase, pi) => (
          <div key={pi} id={`phase-${pi}`}>
            {/* 단계 헤더 */}
            <div className="flex items-center gap-3 mb-3">
              <div className="flex-shrink-0 px-4 py-2 rounded-full font-black text-sm"
                style={{ backgroundColor: phase.bg, color: phase.color, border: `1.5px solid ${phase.border}` }}>
                {phase.phase}
              </div>
              <div className="h-px flex-1 rounded-full" style={{ backgroundColor: phase.border }} />
              <span className="flex-shrink-0 text-xs text-gray-400 font-medium">{phase.period}</span>
            </div>

            {/* 스텝 카드들 */}
            <div className="space-y-2.5 pl-2">
              {phase.steps.map((step, si) => (
                <div key={si} className="relative">
                  {/* 왼쪽 타임라인 라인 */}
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 rounded-full"
                    style={{ backgroundColor: si < phase.steps.length - 1 ? phase.border : 'transparent', left: '-0.5rem' }} />
                  {/* 타임라인 점 */}
                  <div className="absolute w-2 h-2 rounded-full"
                    style={{ backgroundColor: phase.color, left: '-0.75rem', top: '1.25rem' }} />

                  <div className={`ml-2 bg-white rounded-2xl overflow-hidden`}
                    style={{ border: step.highlight ? `2px solid ${phase.color}` : '1px solid #EBEBEB' }}>
                    {step.highlight && (
                      <div className="px-4 py-1.5 text-xs font-bold text-white text-center"
                        style={{ backgroundColor: phase.color }}>
                        ⭐ 가장 효율적인 방법
                      </div>
                    )}
                    <div className="p-4">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl flex-shrink-0 mt-0.5">{step.emoji}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 flex-wrap mb-1">
                            <p className="font-bold text-[#1A1A1A] text-sm" style={{ letterSpacing: '-0.02em' }}>
                              {step.title}
                            </p>
                            {step.warning && (
                              <span className="flex-shrink-0 text-xs font-bold px-2 py-0.5 rounded-full"
                                style={{ backgroundColor: '#FFEBEE', color: '#C62828' }}>
                                ⚠ {step.warning}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500 leading-relaxed mb-2">{step.body}</p>
                          <div className="flex items-center gap-3 flex-wrap">
                            {step.tip && (
                              <span className="text-xs text-gray-400 flex items-center gap-1">
                                <span>💡</span>{step.tip}
                              </span>
                            )}
                            {step.link && (
                              <Link href={step.link}
                                className="text-xs font-bold flex items-center gap-1 hover:opacity-80 transition-opacity"
                                style={{ color: phase.color }}>
                                {step.linkLabel} →
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* 전문가 안내 */}
        <div className="rounded-2xl overflow-hidden"
          style={{ background: 'linear-gradient(135deg,#00C8A5,#0057B8)' }}>
          <div className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="text-white/80 text-sm font-medium mb-1">혼자 처리하기 어려운 절차가 있다면</p>
              <p className="text-white font-black text-lg" style={{ letterSpacing: '-0.03em' }}>
                전문가의 도움을 받으세요
              </p>
              <p className="text-white/60 text-xs mt-1">서류 작성 도움 · 법무사·세무사 연결 · 상담 지원</p>
            </div>
            <Link href="/"
              className="flex-shrink-0 px-6 py-3 bg-white rounded-full font-bold text-sm hover:-translate-y-0.5 transition-all shadow-md"
              style={{ color: '#0057B8' }}>
              전문가 도움 요청하기 →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}