import Link from 'next/link'
import { SERVICES, CATEGORIES } from '../../../data/services'

export function generateStaticParams() {
  return SERVICES.map(s => ({ id: s.id }))
}

export default async function ServiceDetailPage({ params }) {
  const { id } = await params
  const service = SERVICES.find(s => s.id === id)

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F8F7F4' }}>
        <div className="text-center px-4">
          <p className="text-gray-400 text-sm mb-4">서비스를 찾을 수 없습니다.</p>
          <Link href="/services" className="text-sm font-bold text-[#0057B8]">
            목록으로 돌아가기
          </Link>
        </div>
      </div>
    )
  }

  const category = CATEGORIES.find(c => c.id === service.category)

  return (
    <div className="min-h-screen pb-32" style={{ backgroundColor: '#F8F7F4' }}>

      {/* 스티키 상단 바 */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-4 py-3.5 flex items-center gap-3">
          <Link href="/services"
            className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            <span className="text-base leading-none">←</span>
            <span>{category?.label || '목록'}</span>
          </Link>
          <span className="text-gray-200">|</span>
          <span className="text-sm font-semibold text-gray-800 truncate">{service.name}</span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 pt-6 pb-8">

        {/* 무료 배지 */}
        {service.free && (
          <div className="mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold"
              style={{ backgroundColor: '#E6F7F2', color: '#00875A' }}>
              <span>✓</span>
              <span>무료 안내</span>
            </span>
          </div>
        )}

        {/* 아이콘 + 타이틀 */}
        <div className="flex items-start gap-4 mb-6">
          <div
            className="rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md"
            style={{ width: 68, height: 68, backgroundColor: service.color }}
          >
            <span style={{ fontSize: '2rem' }}>{service.emoji}</span>
          </div>
          <div className="pt-1 min-w-0">
            <h1 className="text-2xl font-black text-[#1A1A1A] leading-tight"
              style={{ letterSpacing: '-0.03em' }}>
              {service.name} 계정 정리
            </h1>
            <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">
              {service.tagline.split(' · ').join(' · ')}
            </p>
            <p className="text-sm text-gray-400 mt-1">{service.subtitle}</p>
          </div>
        </div>

        {/* ── 처리 가능한 것들 ── */}
        <div className="mb-3">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3"
            style={{ letterSpacing: '0.08em' }}>
            처리 가능한 것들
          </p>
          <div className="bg-white rounded-2xl overflow-hidden" style={{ border: '1px solid #EBEBEB' }}>
            {service.tasks.map((task, i) => (
              <div key={i}
                className={`flex items-start gap-3.5 px-5 py-4 ${i < service.tasks.length - 1 ? 'border-b' : ''}`}
                style={{ borderColor: '#F2F2F2' }}>
                <span className="text-2xl flex-shrink-0 mt-0.5">{task.emoji}</span>
                <div className="min-w-0">
                  <p className="font-bold text-[#1A1A1A] text-sm leading-snug"
                    style={{ letterSpacing: '-0.02em' }}>
                    {task.title}
                  </p>
                  <p className="text-sm text-gray-500 mt-1 leading-relaxed">{task.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 준비할 서류 ── */}
        <div className="mb-5">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3"
            style={{ letterSpacing: '0.08em' }}>
            준비할 서류
          </p>
          <div className="bg-white rounded-2xl overflow-hidden" style={{ border: '1px solid #EBEBEB' }}>
            {service.documents.map((doc, i) => (
              <div key={i}
                className={`flex items-center gap-3 px-5 py-3.5 ${i < service.documents.length - 1 ? 'border-b' : ''}`}
                style={{ borderColor: '#F2F2F2' }}>
                <span className="text-lg flex-shrink-0">📄</span>
                <span className="text-sm text-gray-700 flex-1 leading-snug">{doc.text}</span>
                {doc.required && (
                  <span className="flex-shrink-0 px-2 py-0.5 rounded-full text-xs font-bold"
                    style={{ backgroundColor: '#EBF3FF', color: '#0057B8' }}>
                    필수
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 안내 노트 */}
        {service.note && (
          <div className="mb-5 px-4 py-3.5 rounded-xl bg-amber-50 border border-amber-100 flex items-start gap-2.5">
            <span className="text-base flex-shrink-0 mt-0.5">💡</span>
            <p className="text-sm text-amber-800 leading-relaxed">{service.note}</p>
          </div>
        )}

        <p className="text-center text-xs text-gray-400 mt-4">
          공식 사이트로 이동합니다. 잇다는 외부 서비스 처리에 책임을 지지 않습니다.
        </p>
      </div>

      {/* 스티키 하단 CTA */}
      <div className="fixed bottom-0 inset-x-0 z-20 bg-white border-t border-gray-100 px-4 py-4"
        style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}>
        <div className="max-w-2xl mx-auto">
          <a href={service.link} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl text-white font-bold text-base shadow-lg transition-all hover:opacity-95 active:scale-[0.98]"
            style={{ background: 'linear-gradient(135deg, #00C8A5 0%, #0057B8 100%)' }}>
            {service.linkLabel} →
          </a>
        </div>
      </div>
    </div>
  )
}