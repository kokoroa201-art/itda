'use client'

import { useState, useEffect } from 'react'

const STORAGE_KEY = 'itda_process_checklist_v1'

const PHASES = [
  {
    id: 'immediate',
    label: '사망 직후',
    badge: '즉시',
    badgeColor: '#FF6B6B',
    badgeBg: '#FFF0F0',
    items: [
      {
        id: 'funeral',
        title: '장례 절차 진행',
        desc: '장례식장·상조 서비스 연락, 빈소 마련',
        agency: '장례식장 / 상조 업체',
      },
      {
        id: 'death_certificate',
        title: '사망진단서 여러 부 발급',
        desc: '기관마다 원본 요구 — 최소 10부 이상 미리 발급 권장',
        agency: '담당 의사 / 병원',
      },
    ],
  },
  {
    id: 'within3days',
    label: '3일 이내',
    badge: '3일',
    badgeColor: '#E65100',
    badgeBg: '#FFF3E0',
    items: [
      {
        id: 'death_report',
        title: '사망신고',
        desc: '법적 의무 사항. 주민센터 방문 또는 정부24 온라인 신청 가능',
        agency: '주민센터 / 정부24',
      },
    ],
  },
  {
    id: 'within14days',
    label: '14일 이내',
    badge: '14일',
    badgeColor: '#7B1FA2',
    badgeBg: '#F3E5F5',
    items: [
      {
        id: 'health_insurance',
        title: '국민건강보험 자격 상실 신고',
        desc: '피부양자 자격 상실 신고 포함. 방문 또는 온라인 신청 가능',
        agency: '국민건강보험공단',
      },
      {
        id: 'drivers_license',
        title: '운전면허증 반납',
        desc: '경찰서 또는 운전면허시험장에 반납',
        agency: '경찰서 / 면허시험장',
      },
    ],
  },
  {
    id: 'within1month',
    label: '1개월 이내',
    badge: '1개월',
    badgeColor: '#0057B8',
    badgeBg: '#EEF4FF',
    items: [
      {
        id: 'onestop',
        title: '안심상속 원스톱 서비스 신청',
        desc: '금융·부동산·세금 등 상속 재산 한번에 조회. 주민센터 방문 또는 정부24',
        agency: '주민센터 / 정부24',
      },
      {
        id: 'bank_accounts',
        title: '금융 계좌 정리',
        desc: '은행·증권·보험사 계좌 조회 후 상속 또는 해지 처리',
        agency: '각 금융기관',
      },
      {
        id: 'pension',
        title: '국민연금 사망 신고 및 유족연금 신청',
        desc: '유족연금 수령 가능 여부 확인. 수령인 없으면 반환일시금 청구',
        agency: '국민연금공단',
      },
      {
        id: 'telecom',
        title: '통신 서비스 해지',
        desc: '이동통신·인터넷·IPTV 등. 자동이체 해지 여부 반드시 확인',
        agency: 'SKT · KT · LGU+ 등',
      },
      {
        id: 'subscriptions',
        title: '구독 서비스 및 자동이체 해지',
        desc: '스트리밍·쇼핑몰·신문 등 정기결제 서비스 조회 및 해지',
        agency: '각 서비스 고객센터',
      },
    ],
  },
  {
    id: 'within3months',
    label: '3개월 이내',
    badge: '3개월',
    badgeColor: '#00756A',
    badgeBg: '#EDFFF9',
    items: [
      {
        id: 'real_estate',
        title: '부동산 상속 등기',
        desc: '상속 결정 후 소유권 이전 등기. 법무사 도움 권장',
        agency: '등기소 / 법무사',
      },
      {
        id: 'vehicle',
        title: '차량 명의 이전 또는 말소',
        desc: '상속인 명의로 이전하거나 폐차 처리',
        agency: '자동차등록사업소',
      },
      {
        id: 'digital_accounts',
        title: 'SNS · 디지털 계정 정리',
        desc: '카카오·네이버·구글 등 계정 추모 전환 또는 탈퇴 처리',
        agency: '각 플랫폼',
      },
    ],
  },
  {
    id: 'within6months',
    label: '6개월 이내',
    badge: '6개월',
    badgeColor: '#1A2035',
    badgeBg: '#F0F2F8',
    items: [
      {
        id: 'inheritance_decision',
        title: '상속 포기 · 한정승인 여부 결정',
        desc: '채무가 재산보다 많으면 상속 포기 또는 한정승인 검토 (법원 신청)',
        agency: '가정법원 / 법무사',
      },
      {
        id: 'inheritance_tax',
        title: '상속세 신고 및 납부',
        desc: '상속 재산이 기본공제(5억 원) 초과 시 신고 의무. 세무사 상담 권장',
        agency: '국세청 / 세무사',
      },
    ],
  },
]

const ALL_ITEMS = PHASES.flatMap(p => p.items)

export default function ChecklistPage() {
  const [checked, setChecked] = useState([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
      setChecked(saved)
    } catch {}
    setMounted(true)
  }, [])

  const toggle = (id) => {
    const next = checked.includes(id)
      ? checked.filter(x => x !== id)
      : [...checked, id]
    setChecked(next)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  }

  const reset = () => {
    setChecked([])
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]))
  }

  const completedCount = checked.length
  const totalCount = ALL_ITEMS.length
  const progressPct = totalCount > 0 ? (completedCount / totalCount) * 100 : 0

  if (!mounted) return null

  return (
    <div className="min-h-screen pb-24" style={{ backgroundColor: '#F8F9FB' }}>

      {/* 타이틀 헤더 — 일반 흐름 (sticky 아님) */}
      <div className="bg-white border-b border-gray-100 pt-28 pb-5">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-xl font-black text-[#1A2035]" style={{ letterSpacing: '-0.035em' }}>
                사망 후 처리 절차 체크리스트
              </h1>
              <p className="text-xs text-gray-400 mt-1">
                사망 직후부터 상속세 신고까지 — 순서대로 체크하세요
              </p>
            </div>
            <button
              onClick={reset}
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0 mt-1"
            >
              초기화
            </button>
          </div>
        </div>
      </div>

      {/* 진행률 바 — sticky */}
      <div className="sticky top-20 z-20 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-400">전체 진행률</span>
            <span className="text-xs font-bold" style={{ color: '#00756A' }}>
              {completedCount} / {totalCount}개 완료
            </span>
          </div>
          <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: '#E8E8E8' }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${progressPct}%`,
                background: 'linear-gradient(90deg, #00C8A5, #0057B8)',
              }}
            />
          </div>
        </div>
      </div>

      {/* 체크리스트 본문 */}
      <div className="max-w-2xl mx-auto px-4 pt-6 pb-5 space-y-6">
        {PHASES.map(phase => {
          const phaseChecked = phase.items.filter(i => checked.includes(i.id)).length
          const phaseTotal = phase.items.length
          const phaseComplete = phaseChecked === phaseTotal

          return (
            <div key={phase.id}>
              {/* 단계 헤더 */}
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="text-xs font-bold px-3 py-1 rounded-full flex-shrink-0"
                  style={{ backgroundColor: phase.badgeBg, color: phase.badgeColor }}
                >
                  {phase.badge}
                </span>
                <span className="font-black text-[#1A2035] text-base" style={{ letterSpacing: '-0.025em' }}>
                  {phase.label}
                </span>
                <span className="text-xs text-gray-400 ml-auto flex-shrink-0">
                  {phaseChecked}/{phaseTotal}
                </span>
              </div>

              {/* 항목들 */}
              <div className="space-y-2">
                {phase.items.map(item => {
                  const isDone = checked.includes(item.id)
                  return (
                    <button
                      key={item.id}
                      onClick={() => toggle(item.id)}
                      className="w-full flex items-start gap-3.5 px-4 py-4 rounded-2xl text-left transition-all"
                      style={{
                        backgroundColor: isDone ? '#F0FAF5' : '#FFFFFF',
                        border: `1px solid ${isDone ? '#B2DFDB' : '#EBEBEB'}`,
                      }}
                    >
                      {/* 체크박스 */}
                      <div
                        className="flex-shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center mt-0.5 transition-all"
                        style={{
                          borderColor: isDone ? '#3B6D4A' : '#CCCCCC',
                          backgroundColor: isDone ? '#3B6D4A' : 'transparent',
                        }}
                      >
                        {isDone && (
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 12 12" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M2 6l3 3 5-5" />
                          </svg>
                        )}
                      </div>

                      {/* 내용 */}
                      <div className="flex-1 min-w-0">
                        <p
                          className="font-bold text-sm leading-tight"
                          style={{
                            letterSpacing: '-0.02em',
                            color: isDone ? '#1A4A2E' : '#1A2035',
                            textDecoration: isDone ? 'line-through' : 'none',
                            opacity: isDone ? 0.7 : 1,
                          }}
                        >
                          {item.title}
                        </p>
                        <p className="text-xs text-gray-500 mt-1 leading-relaxed" style={{ opacity: isDone ? 0.6 : 1 }}>
                          {item.desc}
                        </p>
                        <p className="text-xs font-medium mt-1.5" style={{ color: phase.badgeColor, opacity: isDone ? 0.5 : 0.8 }}>
                          {item.agency}
                        </p>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}

        {/* 완료 메시지 */}
        {completedCount === totalCount && totalCount > 0 && (
          <div
            className="rounded-2xl p-6 text-center"
            style={{ background: 'linear-gradient(135deg, #EDFFF9 0%, #EEF4FF 100%)', border: '1px solid #B2DFDB' }}
          >
            <div className="text-3xl mb-2">✅</div>
            <p className="font-black text-[#1A2035] text-base mb-1" style={{ letterSpacing: '-0.025em' }}>
              모든 절차를 완료했습니다
            </p>
            <p className="text-sm text-gray-500">
              힘든 시간을 잘 이겨내셨습니다. 남은 일이 있다면 언제든 돌아오세요.
            </p>
          </div>
        )}

        {/* 하단 안내 */}
        <div
          className="rounded-2xl px-5 py-4"
          style={{ backgroundColor: '#F0F2F8', border: '1px solid #E0E4F0' }}
        >
          <p className="text-xs text-gray-500 leading-relaxed">
            <span className="font-bold text-[#1A2035]">참고 사항 ·</span>{' '}
            각 절차의 기한과 처리 기관은 일반적인 기준이며 상황에 따라 달라질 수 있습니다.
            복잡한 상속 절차나 세금 문제는 법무사·세무사 전문가 상담을 권장합니다.
          </p>
        </div>
      </div>
    </div>
  )
}
