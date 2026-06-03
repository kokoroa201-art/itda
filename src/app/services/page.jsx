'use client'

import { useState, useEffect } from 'react'
import { CATEGORIES, SERVICES } from '../../data/services'

function LogoIcon({ service, size = 56 }) {
  return (
    <div
      className="rounded-2xl flex items-center justify-center flex-shrink-0"
      style={{ width: size, height: size, backgroundColor: service.color }}
    >
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
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 py-5">
          <div className="flex items-center gap-3 mb-4">
            <a href="/"
              className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors">
              ← 홈
            </a>
          </div>
          <h1 className="text-xl font-black text-[#1A2035] mb-1" style={{ letterSpacing: '-0.035em' }}>
            무료 절차 안내
          </h1>
          <p className="text-sm text-gray-500">직접 처리할 수 있는 것들을 한 곳에서 확인하세요.</p>

          {/* 검색창 */}
          <div className="relative mt-4">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
            <input
              type="text"
              placeholder="기관명·서비스명 검색"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#00C8A5]/40 focus:border-[#00C8A5] focus:bg-white transition-colors"
            />
          </div>
        </div>

        {/* 카테고리 탭 */}
        <div className="max-w-3xl mx-auto px-4 pb-0">
          <div className="flex gap-2 overflow-x-auto pb-3" style={{ scrollbarWidth: 'none' }}>
            {CATEGORIES.map(cat => {
              const count = cat.id === 'all'
                ? SERVICES.length
                : SERVICES.filter(s => s.category === cat.id).length
              return (
                <button key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                    activeCategory === cat.id
                      ? 'bg-[#0057B8] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <span>{cat.emoji}</span>
                  <span>{cat.label}</span>
                  <span className={`text-xs ${activeCategory === cat.id ? 'text-white/60' : 'text-gray-400'}`}>
                    {count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* 그리드 */}
      <div className="max-w-3xl mx-auto px-4 py-5">
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400 text-sm">
            검색 결과가 없습니다.
          </div>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
            {filtered.map(service => (
              <a key={service.id} href={`/services/${service.id}`}
                className="group flex flex-col items-center gap-2 p-3.5 bg-white rounded-2xl border border-gray-100 hover:border-[#00C8A5]/40 hover:shadow-md hover:-translate-y-0.5 transition-all text-center cursor-pointer"
              >
                <LogoIcon service={service} size={52} />
                <div className="w-full">
                  <div className="font-bold text-[#1A2035] text-xs leading-tight group-hover:text-[#007A68] transition-colors"
                    style={{ letterSpacing: '-0.02em' }}>
                    {service.name}
                  </div>
                  {service.free && (
                    <span className="inline-block mt-1 px-1.5 py-0.5 rounded-full bg-[#00C8A5]/10 text-[#007A68] text-[10px] font-bold">
                      무료
                    </span>
                  )}
                </div>
              </a>
            ))}
          </div>
        )}

        <p className="text-center text-xs text-gray-400 mt-8 mb-4">
          더 많은 기관이 계속 추가됩니다 · 현재 {SERVICES.length}개 서비스
        </p>
      </div>
    </div>
  )
}