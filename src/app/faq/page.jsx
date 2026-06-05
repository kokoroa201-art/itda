'use client'

import { useState } from 'react'
import Link from 'next/link'

const FAQ_GROUPS = [
  {
    category: '서비스 기본',
    emoji: '💡',
    items: [
      {
        q: '잇다는 어떤 서비스인가요?',
        a: '잇다는 가족이 돌아가신 후 처리해야 할 행정·금융·디지털 절차를 한 곳에서 찾아볼 수 있게 모아놓은 플랫폼입니다. 정부기관, 은행, 통신사, SNS, 보험 등 35개 이상의 기관에 대한 절차와 공식 신청 페이지를 직접 연결해드립니다. 정보를 찾고 확인하는 것은 무료이며, 직접 처리하기 어려우신 분들을 위해 전문가 연결 서비스도 제공합니다.',
      },
      {
        q: '비용이 드나요?',
        a: '절차 안내, 체크리스트, 가이드 등 정보를 찾고 확인하는 것은 무료입니다. 흩어진 정보를 한 곳에서 찾아볼 수 있도록 돕는 것이 잇다의 역할입니다. 직접 처리하기 어렵거나 복잡한 절차가 있을 때 전문가(법무사·변호사) 연결을 요청하실 수 있으며, 이 경우에만 비용이 발생합니다.',
      },
      {
        q: '회원가입이 필요한가요?',
        a: '아니요. 회원가입 없이 모든 절차 안내와 체크리스트를 이용할 수 있습니다. 체크리스트 진행 상황은 브라우저에 저장되어 같은 기기에서 이어서 사용하실 수 있습니다.',
      },
    ],
  },
  {
    category: '절차 및 서류',
    emoji: '📄',
    items: [
      {
        q: '비밀번호를 모르는 경우에도 처리할 수 있나요?',
        a: '네, 대부분의 기관은 비밀번호 없이 사망진단서와 가족관계증명서만으로 처리할 수 있습니다. 특히 카카오, 네이버 등 주요 SNS는 고인의 비밀번호 없이 유족이 직접 신청할 수 있는 절차를 운영하고 있습니다.',
      },
      {
        q: '가장 먼저 준비해야 할 서류는 무엇인가요?',
        a: '사망진단서(원본 5~10장)와 가족관계증명서를 먼저 발급받으세요. 이 두 서류는 거의 모든 기관에서 공통으로 요구합니다. 사망진단서는 병원에서, 가족관계증명서는 주민센터 또는 정부24에서 발급받을 수 있습니다.',
        highlight: true,
      },
      {
        q: '상속인이 여러 명이면 모두 함께 방문해야 하나요?',
        a: '기관에 따라 다릅니다. 은행 계좌 해지나 부동산 이전 등 큰 자산의 경우 상속인 전원의 동의가 필요한 경우가 있습니다. 반면 통신 해지, 구독 서비스 해지 등 소액 처리는 대표 상속인 1인이 단독으로 처리할 수 있습니다.',
      },
      {
        q: '사망진단서 원본이 여러 장 필요한가요?',
        a: '네, 각 기관이 원본을 요구하는 경우가 많으므로 최소 5~10장을 미리 발급받으시길 권장합니다. 병원에서 초기에 여러 장을 신청하면 번거로움을 줄일 수 있습니다. 이후 추가 발급은 가능하나 번거롭습니다.',
      },
    ],
  },
  {
    category: '상속 및 법적 절차',
    emoji: '⚖️',
    items: [
      {
        q: '상속 포기와 한정승인의 차이는 무엇인가요?',
        a: '상속 포기는 재산과 부채를 모두 포기하는 것이고, 한정승인은 받은 재산 한도 내에서만 부채를 갚는 것입니다. 부채가 많은 경우 한정승인이 유리할 수 있습니다. 둘 다 사망 후 3개월 이내에 법원에 신청해야 합니다. 기간을 넘기면 단순 승인(재산과 부채 모두 상속)으로 간주됩니다.',
        warning: '사망 후 3개월 내 신청 필수',
      },
      {
        q: '상속 포기 기간 3개월이 지났는데 어떻게 해야 하나요?',
        a: '3개월이 지나면 원칙적으로 단순 승인으로 처리됩니다. 다만 부채를 알지 못했던 특별한 사정이 있는 경우 특별한정승인을 신청할 수 있습니다. 이 경우 법무사나 변호사의 도움을 받으시는 것이 좋습니다.',
      },
      {
        q: '미성년자인 자녀도 상속인이 되나요?',
        a: '네, 미성년자도 상속인이 될 수 있습니다. 미성년자를 위한 법적 절차는 법정대리인(주로 다른 부모)이 대신 처리합니다. 미성년 자녀가 있는 경우 상속 관련 결정 전에 전문가와 상담하시길 권장합니다.',
      },
    ],
  },
  {
    category: '금융·통신 처리',
    emoji: '🏦',
    items: [
      {
        q: '모든 은행 계좌를 어떻게 한 번에 조회하나요?',
        a: '금융감독원의 "상속인 금융거래 통합조회 서비스"를 이용하면 피상속인이 거래한 모든 금융기관을 한 번에 조회할 수 있습니다. 가까운 은행 영업점에서 신청하거나 인터넷뱅킹을 통해 조회할 수 있습니다.',
      },
      {
        q: '통신 해지 시 위약금이 발생하나요?',
        a: '사망으로 인한 해지는 대부분의 통신사에서 위약금 없이 처리됩니다. 단말기 할부금은 상속 여부에 따라 처리 방법이 달라질 수 있습니다. 각 통신사 고객센터에 문의하시면 정확한 안내를 받을 수 있습니다.',
      },
    ],
  },
  {
    category: 'SNS·디지털',
    emoji: '💬',
    items: [
      {
        q: 'SNS 계정을 삭제해야 하나요, 아니면 남겨두어야 하나요?',
        a: '개인의 선택입니다. 페이스북, 인스타그램 등은 "추모 계정"으로 전환해 고인의 게시물을 보존할 수 있고, 삭제를 원한다면 삭제 요청도 가능합니다. 카카오의 경우 잔액 환급을 위해 처리가 필요합니다.',
      },
      {
        q: '카카오페이 잔액은 어떻게 돌려받나요?',
        a: '카카오 고객센터에 유족이 직접 신청할 수 있습니다. 사망진단서, 가족관계증명서, 상속인 신분증, 통장 사본이 필요하며 처리 기간은 약 2~4주입니다. 카카오페이 잔액 외에도 카카오쇼핑, 선물함 잔여금도 확인할 수 있습니다.',
      },
    ],
  },
]

function AccordionItem({ item }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`rounded-2xl overflow-hidden transition-all ${open ? 'ring-2 ring-[#00C8A5]/30' : ''}`}
      style={{ border: '1px solid #EBEBEB', backgroundColor: open ? '#FAFFFE' : '#FFFFFF' }}>
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-start gap-3 px-5 py-4 text-left">
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2">
            {item.highlight && (
              <span className="flex-shrink-0 mt-0.5 text-xs font-bold px-2 py-0.5 rounded-full"
                style={{ backgroundColor: '#E6F7F2', color: '#00875A' }}>핵심</span>
            )}
            {item.warning && (
              <span className="flex-shrink-0 mt-0.5 text-xs font-bold px-2 py-0.5 rounded-full"
                style={{ backgroundColor: '#FFEBEE', color: '#C62828' }}>⚠ {item.warning}</span>
            )}
          </div>
          <p className={`font-bold text-sm mt-1 ${open ? 'text-[#007A68]' : 'text-[#1A1A1A]'}`}
            style={{ letterSpacing: '-0.02em' }}>
            Q. {item.q}
          </p>
        </div>
        <span className={`flex-shrink-0 text-gray-400 transition-transform mt-0.5 ${open ? 'rotate-180' : ''}`}>▼</span>
      </button>
      {open && (
        <div className="px-5 pb-5 pt-0">
          <div className="h-px mb-4" style={{ backgroundColor: '#E8F5F2' }} />
          <p className="text-sm text-gray-600 leading-relaxed">{item.a}</p>
        </div>
      )}
    </div>
  )
}

export default function FAQPage() {
  const [activeGroup, setActiveGroup] = useState('all')

  const groups = activeGroup === 'all'
    ? FAQ_GROUPS
    : FAQ_GROUPS.filter(g => g.category === activeGroup)

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8F7F4' }}>

      {/* 헤더 */}
      <div className="bg-white border-b border-gray-100 px-4 pt-24 pb-10">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-bold text-gray-400 mb-2" style={{ letterSpacing: '0.08em' }}>FAQ</p>
          <h1 className="text-3xl font-black text-[#1A2035] mb-3" style={{ letterSpacing: '-0.04em' }}>
            자주 묻는 질문
          </h1>
          <p className="text-gray-500 text-sm">궁금한 점을 찾아보세요. 총 {FAQ_GROUPS.reduce((s, g) => s + g.items.length, 0)}개의 답변이 있습니다.</p>

          {/* 카테고리 필터 */}
          <div className="flex flex-wrap gap-2 mt-5">
            <button onClick={() => setActiveGroup('all')}
              className={`px-3.5 py-1.5 rounded-full text-sm font-semibold transition-all ${
                activeGroup === 'all' ? 'bg-[#0057B8] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}>
              전체
            </button>
            {FAQ_GROUPS.map(g => (
              <button key={g.category} onClick={() => setActiveGroup(g.category)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-semibold transition-all ${
                  activeGroup === g.category ? 'bg-[#0057B8] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}>
                <span>{g.emoji}</span>
                <span>{g.category}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ 목록 */}
      <div className="max-w-3xl mx-auto px-4 py-6 space-y-8">
        {groups.map((group, gi) => (
          <div key={gi}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">{group.emoji}</span>
              <h2 className="font-bold text-[#1A2035] text-sm" style={{ letterSpacing: '-0.02em' }}>
                {group.category}
              </h2>
            </div>
            <div className="space-y-2">
              {group.items.map((item, ii) => (
                <AccordionItem key={ii} item={item} />
              ))}
            </div>
          </div>
        ))}

        {/* 추가 문의 CTA */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 text-center">
          <p className="text-2xl mb-3">🤔</p>
          <p className="font-bold text-[#1A2035] text-sm mb-1" style={{ letterSpacing: '-0.02em' }}>
            원하는 답변을 찾지 못하셨나요?
          </p>
          <p className="text-gray-400 text-xs mb-4">전문가에게 직접 문의하시면 도움을 받을 수 있습니다</p>
          <Link href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-bold text-sm shadow-md"
            style={{ background: 'linear-gradient(135deg,#00C8A5,#0057B8)' }}>
            전문가에게 문의하기 →
          </Link>
        </div>
      </div>
    </div>
  )
}