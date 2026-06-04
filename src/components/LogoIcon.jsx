'use client'

import { useState } from 'react'

// phase 0: Clearbit (고품질 브랜드 로고)
// phase 1: Google Favicon (한국 사이트 포함 거의 모든 도메인 지원)
// phase 2: 이모지 폴백
export default function LogoIcon({ service, size = 56 }) {
  const [phase, setPhase] = useState(0)

  const logoUrl = service.domain
    ? phase === 0
      ? `https://logo.clearbit.com/${service.domain}`
      : phase === 1
      ? `https://www.google.com/s2/favicons?domain=${service.domain}&sz=128`
      : null
    : null

  const radius = Math.round(size * 0.28)
  const showImg = !!logoUrl

  return (
    <div
      className="flex items-center justify-center flex-shrink-0 overflow-hidden"
      style={{
        width: size,
        height: size,
        minWidth: size,
        borderRadius: radius,
        backgroundColor: showImg ? '#FFFFFF' : service.color,
        border: showImg ? '1.5px solid #E8E8E8' : 'none',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      }}
    >
      {showImg ? (
        <img
          src={logoUrl}
          alt=""
          style={{ width: '72%', height: '72%', objectFit: 'contain' }}
          onError={() => setPhase(p => p + 1)}
        />
      ) : (
        <span style={{ fontSize: size * 0.44, lineHeight: 1 }}>{service.emoji}</span>
      )}
    </div>
  )
}
