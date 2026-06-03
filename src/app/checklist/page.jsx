'use client'

import { useState, useEffect } from 'react'
import { CATEGORIES, SERVICES, DIFFICULTY } from '../../data/services'

const STORAGE_KEY = 'itda_checklist_v1'

function LogoIcon({ service, size = 40 }) {
  return (
    <div className="rounded-xl flex items-center justify-center flex-shrink-0"
      style={{ width: size, height: size, backgroundColor: service.color }}>
      <span style={{ fontSize: size * 0.44 }}>{service.emoji}</span>
    </div>
  )
}

function DiffBadge({ difficulty }) {
  const d = DIFFICULTY[difficulty]
  if (!d) return null
  return (
    <span className="flex-shrink-0 text-xs font-bold px-2 py-0.5 rounded-full"
      style={{ backgroundColor: d.bg, color: d.color }}>
      {d.label}
    </span>
  )
}

export default function ChecklistPage() {
  const [checked, setChecked] = useState([])
  const [activeCategory, setActiveCategory] = useState('all')
  const [showDocs, setShowDocs] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
      setChecked(saved)
    } catch {}
    setMounted(true)
  }, [])

  const save = (next) => {
    setChecked(next)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  }

  const toggle = (id) => {
    save(checked.includes(id) ? checked.filter(x => x !== id) : [...checked, id])
  }

  const filtered = SERVICES.filter(s =>
    activeCategory === 'all' || s.category === activeCategory
  )

  const selectAll   = () => save([...new Set([...checked, ...filtered.map(s => s.id)])])
  const deselectAll = () => save(checked.filter(id => !filtered.map(s => s.id).includes(id)))

  // 선택된 서비스들의 unique 필수 서류
  const checkedServices = SERVICES.filter(s => checked.includes(s.id))
  const requiredDocs = [...new Set(
    checkedServices.flatMap(s => s.documents.filter(d => d.required).map(d => d.text))
  )]
  const hasHard = checkedServices.some(s => s.difficulty === 'hard')

  const completedCount = checked.length
  const totalCount     = SERVICES.length
  const progressPct    = totalCount > 0 ? (completedCount / totalCount) * 100 : 0

  if (!mounted) return null

  return (
    <div className="min-h-screen pb-40" style={{ backgroundColor: '#F8F7F4' }}>

      {/* 상단 바 */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-4 pt-4 pb-0">
          <div className="flex items-center gap-2 mb-3">
            <a href="/" className="text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors">
              ← 홈
            </a>
          </div>

          <h1 className="text-xl font-black text-[#1A2035] mb-0.5" style={{ letterSpacing: '-0.035em' }}>
            정리 대상 서비스 선택
          </h1>
          <p className="text-sm text-gray-400 mb-3">
            해지할 서비스를 선택해 진행 현황을 관리하세요
          </p>

          {/* 진행률 */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-400">완료한 서비스</span>
            <span className="text-xs font-bold text-[#3B6D4A]">{completedCount} / {totalCount}개</span>
          </div>
          <div className="w-full h-2 rounded-full mb-3" style={{ backgroundColor: '#E8E8E8' }}>
            <div className="h-2 rounded-full transition-all duration-500"
              style={{
                width: `${progressPct}%`,
                background: 'linear-gradient(90deg, #00C8A5, #0057B8)',
              }} />
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

          {/* 전체 선택/해제 */}
          <div className="flex gap-2 pb-3">
            <button onClick={selectAll}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
              style={{ backgroundColor: '#E6F7F2', color: '#00875A' }}>
              <span>✓</span> 전체 선택
            </button>
            <button onClick={deselectAll}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
              style={{ backgroundColor: '#F0F0F0', color: '#666' }}>
              <span>□</span> 전체 해제
            </button>
          </div>
        </div>
      </div>

      {/* 서비스 리스트 */}
      <div className="max-w-2xl mx-auto px-4 py-3">
        <div className="space-y-2">
          {filtered.map(service => {
            const isChecked = checked.includes(service.id)
            return (
              <button key={service.id}
                onClick={() => toggle(service.id)}
                className="w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-left transition-all"
                style={{
                  backgroundColor: isChecked ? '#F0FAF5' : '#FFFFFF',
                  border: `1px solid ${isChecked ? '#B2DFDB' : '#EBEBEB'}`,
                }}>

                {/* 체크박스 */}
                <div className="flex-shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all"
                  style={{
                    borderColor: isChecked ? '#3B6D4A' : '#CCCCCC',
                    backgroundColor: isChecked ? '#3B6D4A' : 'transparent',
                  }}>
                  {isChecked && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 12 12" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M2 6l3 3 5-5" />
                    </svg>
                  )}
                </div>

                <LogoIcon service={service} />

                <div className="flex-1 min-w-0">
                  <p className={`font-bold text-sm leading-tight ${isChecked ? 'text-[#1A4A2E]' : 'text-[#1A1A1A]'}`}
                    style={{ letterSpacing: '-0.02em' }}>
                    {service.name}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {CATEGORIES.find(c => c.id === service.category)?.label}
                  </p>
                </div>

                <DiffBadge difficulty={service.difficulty} />
              </button>
            )
          })}
        </div>
      </div>

      {/* 스티키 하단 CTA */}
      <div className="fixed bottom-0 inset-x-0 z-20 bg-white border-t border-gray-100 px-4 py-4"
        style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}>
        <div className="max-w-2xl mx-auto space-y-2.5">

          {/* 서류 목록 (선택된 서비스 있을 때) */}
          {showDocs && checked.length > 0 && (
            <div className="rounded-2xl p-4 mb-1"
              style={{ backgroundColor: '#F0FAF5', border: '1px solid #B2DFDB' }}>
              <p className="text-sm font-bold text-[#1A4A2E] mb-3">
                📄 필요 서류 목록 ({requiredDocs.length}종)
              </p>
              <div className="space-y-2">
                {requiredDocs.length === 0 ? (
                  <p className="text-sm text-gray-500">서류가 필요 없는 서비스만 선택됐어요.</p>
                ) : (
                  requiredDocs.map((doc, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-base">📄</span>
                      <span className="text-sm text-gray-700">{doc}</span>
                    </div>
                  ))
                )}
              </div>
              <p className="text-xs text-gray-400 mt-3">
                * 선택한 {checked.length}개 서비스 기준. 일부 중복 제거됨.
              </p>
            </div>
          )}

          {checked.length > 0 ? (
            <>
              <button onClick={() => setShowDocs(v => !v)}
                className="w-full py-3.5 rounded-2xl font-bold text-sm text-white flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98]"
                style={{ background: 'linear-gradient(135deg, #3B6D4A, #1A4A2E)' }}>
                📄 필요 서류 목록 보기 ({checked.length}개 서비스)
                <span className="text-white/70 font-normal">{showDocs ? '▲' : '▼'}</span>
              </button>
              <a href="/services"
                className="w-full py-3.5 rounded-2xl font-semibold text-sm text-gray-700 flex items-center justify-center gap-2 transition-all"
                style={{ backgroundColor: '#F0F0F0', border: '1px solid #E0E0E0' }}>
                해지 절차 안내 보기 →
              </a>
            </>
          ) : (
            <a href="/services"
              className="w-full py-3.5 rounded-2xl font-bold text-white text-sm flex items-center justify-center gap-2 shadow-md"
              style={{ background: 'linear-gradient(135deg, #00C8A5 0%, #0057B8 100%)' }}>
              해지 절차 안내 바로 보기 →
            </a>
          )}

          {hasHard && (
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl"
              style={{ backgroundColor: '#FFF3E0' }}>
              <span className="text-sm">⚠️</span>
              <p className="text-xs font-medium" style={{ color: '#E65100' }}>
                어려움 서비스는 전문가 연계를 권장합니다
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}