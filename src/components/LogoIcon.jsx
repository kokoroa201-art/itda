'use client'

import { useState } from 'react'

export default function LogoIcon({ service, size = 56 }) {
  const [failed, setFailed] = useState(false)

  const logoUrl = (!failed && service.domain)
    ? `https://logo.clearbit.com/${service.domain}`
    : null

  const radius = Math.round(size * 0.28)

  return (
    <div
      className="flex items-center justify-center flex-shrink-0 overflow-hidden"
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        backgroundColor: logoUrl ? '#FFFFFF' : service.color,
        border: logoUrl ? '1.5px solid #E8E8E8' : 'none',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      }}
    >
      {logoUrl ? (
        <img
          src={logoUrl}
          alt={service.name}
          style={{ width: '72%', height: '72%', objectFit: 'contain' }}
          onError={() => setFailed(true)}
        />
      ) : (
        <span style={{ fontSize: size * 0.44, lineHeight: 1 }}>{service.emoji}</span>
      )}
    </div>
  )
}