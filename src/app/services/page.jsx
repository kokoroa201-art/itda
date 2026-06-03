'use client'

import { useState, useEffect } from 'react'
import { CATEGORIES, SERVICES, DIFFICULTY } from '../../data/services'

function DiffBadge({ difficulty }) {
  const d = DIFFICULTY[difficulty]
  if (!d) return null
  return (
    <span className="flex-shrink-0 text-xs font-bold px-2.5 py-1 rounded-full"
      style={{ backgroundColor: d.bg, color: d.color }}>
      {d.label}
    </span>
  )
}

function LogoIcon({ service, size = 44 }) {
  return (
    <div className="rounded-xl flex items-center justify-center flex-shrink-0"
      style={{ width: size, height: size, backgroundColor: service.color }}>
      <span style={{ fontSize: size * 0.46 }}>{service.emoji}</span>
    </div>
  )
}

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [search, setSearch] = useState('')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const cat = params.get('cat')
    if (cat) setActiveCategory(cat)
  }, [])

  const filtered = SERVICES.filter(s => {
    const matchCat = activeCategory === 'all' || s.category === activeCategory
    const q = search.toLowerCase()
    const matchSearch = !q || s.name.toLowerCase().includes(q) || s.tagline.includes(q)
    return matchCat && matchSearch
  })

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8F7F4' }}>

      {/* 상단 헤더 */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 pt-5 pb-0">
          <div className="flex items-center gap-2 mb-4">
            <a href="/" className="text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors">
              ← 홈
            </a>
          </div>

          <h1 className="text-xl font-black text-[#1A2035] mb-0.5" style={{ letterSpacing: '-0.035em' }}>
            해지 안내
          </h1>
          <p className="text-sm text-gray-400 mb-4">서비스를 눌러 절차를 확인하세요 — 모두 무료</p>

          {/* 검색 */}
          <div className="relative mb-3">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
            <input
              type="text"
              placeholder="서비스명 검색"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-gray-50
                focus:outline-none focus:ring-2 focus:ring-[#00C8A5]/40 focus:border-[#00C8A5] focus:bg-white transition-colors"
            />
          </div>

          {/* 카테고리 탭 */}
          <div className="flex gap-2 overflow-x-auto pb-3" style={{ scrollbarWidth: 'none' }}>
            {CATEGORIES.map(cat => {
              const count = cat.id === 'all'
                ? SERVICES.length
                : SERVICES.filter(s => s.category === cat.id).length
              return (
                <button key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-sm font-semibold transition-all ${
                    activeCategory === cat.id
                      ? 'bg-[#3B6D4A] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}>
                  {cat.label}
                  <span className={`ml-1 text-xs ${activeCategory === cat.id ? 'text-white/60' : 'text-gray-400'}`}>
                    {count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* 리스트 */}
      <div className="max-w-2xl mx-auto px-4 py-4">
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400 text-sm">검색 결과가 없습니다.</div>
        ) : (
          <div className="space-y-2">
            {filtered.map(service => (
              <a key={service.id} href={`/services/${service.id}`}
                className="flex items-center gap-3.5 bg-white rounded-2xl px-4 py-4 border border-transparent
                  hover:border-[#00C8A5]/30 hover:shadow-sm transition-all cursor-pointer"
                style={{ borderColor: '#EBEBEB' }}>

                <LogoIcon service={service} />

                <div className="flex-1 min-w-0">
                  <p className="font-bold text-[#1A1A1A] text-sm leading-tight" style={{ letterSpacing: '-0.02em' }}>
                    {service.name}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1.5">
                    {service.duration && (
                      <>
                        <span>⏱</span>
                        <span>{service.duration}</span>
                      </>
                    )}
                    {service.docCount > 0 && (
                      <>
                        <span className="text-gray-200">·</span>
                        <span>서류 {service.docCount}종</span>
                      </>
                    )}
                    {service.docCount === 0 && (
                      <>
                        <span className="text-gray-200">·</span>
                        <span>서류 불필요</span>
                      </>
                    )}
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <DiffBadge difficulty={service.difficulty} />
                  <span className="text-gray-300 text-sm">▼</span>
                </div>
              </a>
            ))}
          </div>
        )}

        {/* 하단 안내 */}
        {filtered.some(s => s.difficulty === 'hard') && (
          <div className="mt-5 px-4 py-3 rounded-xl flex items-center gap-2"
            style={{ backgroundColor: '#FFF3E0', border: '1px solid #FFE0B2' }}>
            <span>⚠️</span>
            <p className="text-sm font-medium" style={{ color: '#E65100' }}>
              어려움 서비스는 전문가 연계를 권장합니다
            </p>
          </div>
        )}

        <p className="text-center text-xs text-gray-400 mt-6 mb-4">
          현재 {SERVICES.length}개 서비스 · 계속 추가됩니다
        </p>
      </div>
    </div>
  )
}