import Link from 'next/link'
import { SERVICES, CATEGORIES, DIFFICULTY } from '../../../data/services'
import LogoIcon from '../../../components/LogoIcon'

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
          <Link href="/services" className="text-sm font-bold text-[#0057B8]">목록으로 돌아가기</Link>
        </div>
      </div>
    )
  }

  const category = CATEGORIES.find(c => c.id === service.category)
  const diff = DIFFICULTY[service.difficulty]

  return (
    <div className="min-h-screen pb-28" style={{ backgroundColor: '#F8F7F4' }}>

      {/* 서브 상단 바 (Navbar 아래) */}
      <div className="sticky top-20 z-20 bg-white border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-2">
          <Link href="/services"
            className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            ← {category?.label || '목록'}
          </Link>
          <span className="text-gray-200">|</span>
          <span className="text-sm font-semibold text-gray-800 truncate">{service.name}</span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 pt-5 pb-6">

        {/* 무료 배지 */}
        {service.free && (
          <div className="mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold"
              style={{ backgroundColor: '#E6F7F2', color: '#00875A' }}>
              ✓ 무료 안내
            </span>
          </div>
        )}

        {/* 아이콘 + 제목 */}
        <div className="flex items-start gap-4 mb-5">
          <LogoIcon service={service} size={64} />
          <div className="pt-0.5 min-w-0">
            <h1 className="text-2xl font-black text-[#1A1A1A] leading-tight"
              style={{ letterSpacing: '-0.03em' }}>
              {service.name} 정리
            </h1>
            <p className="text-sm text-gray-500 mt-1">{service.subtitle}</p>
          </div>
        </div>

        {/* 난이도 + 소요시간 요약 칩 */}
        <div className="flex items-center gap-2 mb-5 flex-wrap">
          {diff && (
            <span className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full"
              style={{ backgroundColor: diff.bg, color: diff.color }}>
              {service.difficulty === 'easy' ? '😊' : service.difficulty === 'medium' ? '😐' : '😓'}
              {' '}{diff.label}
            </span>
          )}
          {service.duration && (
            <span className="inline-flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-full"
              style={{ backgroundColor: '#F0F0F0', color: '#666' }}>
              ⏱ {service.duration}
            </span>
          )}
          {service.docCount > 0 && (
            <span className="inline-flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-full"
              style={{ backgroundColor: '#F0F0F0', color: '#666' }}>
              📄 서류 {service.docCount}종
            </span>
          )}
          {service.docCount === 0 && (
            <span className="inline-flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-full"
              style={{ backgroundColor: '#E6F7F2', color: '#00875A' }}>
              📄 서류 불필요
            </span>
          )}
        </div>

        {/* ── 처리 가능한 것들 ── */}
        <p className="text-xs font-bold text-gray-400 mb-2.5" style={{ letterSpacing: '0.06em' }}>
          처리 가능한 것들
        </p>
        <div className="bg-white rounded-2xl overflow-hidden mb-4" style={{ border: '1px solid #EBEBEB' }}>
          {service.tasks.map((task, i) => (
            <div key={i}
              className={`flex items-start gap-3.5 px-5 py-4 ${i < service.tasks.length - 1 ? 'border-b' : ''}`}
              style={{ borderColor: '#F2F2F2' }}>
              <span className="text-2xl flex-shrink-0 mt-0.5">{task.emoji}</span>
              <div>
                <p className="font-bold text-[#1A1A1A] text-sm" style={{ letterSpacing: '-0.02em' }}>
                  {task.title}
                </p>
                <p className="text-sm text-gray-500 mt-0.5 leading-relaxed">{task.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── 준비할 서류 ── */}
        <p className="text-xs font-bold text-gray-400 mb-2.5" style={{ letterSpacing: '0.06em' }}>
          준비할 서류
        </p>
        <div className="bg-white rounded-2xl overflow-hidden mb-4" style={{ border: '1px solid #EBEBEB' }}>
          {service.docCount === 0 ? (
            <div className="px-5 py-4 flex items-center gap-3">
              <span className="text-xl">✅</span>
              <p className="text-sm text-gray-500">별도 서류 없이 진행할 수 있습니다.</p>
            </div>
          ) : (
            service.documents.map((doc, i) => (
              <div key={i}
                className={`flex items-center gap-3 px-5 py-3.5 ${i < service.documents.length - 1 ? 'border-b' : ''}`}
                style={{ borderColor: '#F2F2F2' }}>
                <span className="text-base flex-shrink-0">📄</span>
                <span className="text-sm text-gray-700 flex-1">{doc.text}</span>
                {doc.required && (
                  <span className="flex-shrink-0 text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: '#EBF3FF', color: '#0057B8' }}>
                    필수
                  </span>
                )}
              </div>
            ))
          )}
        </div>

        {/* 어려움 경고 */}
        {service.difficulty === 'hard' && (
          <div className="mb-4 px-4 py-3.5 rounded-xl flex items-start gap-2.5"
            style={{ backgroundColor: '#FFEBEE', border: '1px solid #FFCDD2' }}>
            <span className="text-base flex-shrink-0">⚠️</span>
            <p className="text-sm leading-relaxed" style={{ color: '#C62828' }}>
              이 서비스는 난이도가 높습니다. 전문가 연계를 권장합니다.
            </p>
          </div>
        )}

        {/* 안내 노트 */}
        {service.note && (
          <div className="mb-4 px-4 py-3.5 rounded-xl flex items-start gap-2.5"
            style={{ backgroundColor: '#FFFDE7', border: '1px solid #FFF9C4' }}>
            <span className="text-base flex-shrink-0">💡</span>
            <p className="text-sm text-amber-800 leading-relaxed">{service.note}</p>
          </div>
        )}

        <p className="text-center text-xs text-gray-400 mt-2">
          공식 사이트로 이동합니다. 잇다는 외부 서비스 처리에 책임을 지지 않습니다.
        </p>
      </div>

      {/* 스티키 하단 CTA */}
      <div className="fixed bottom-0 inset-x-0 z-20 bg-white/95 backdrop-blur-sm border-t border-gray-100 px-4 py-3"
        style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}>
        <div className="max-w-2xl mx-auto">
          <a href={service.link} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl text-white font-bold text-base shadow-md transition-all hover:opacity-95 active:scale-[0.98]"
            style={{ background: 'linear-gradient(135deg, #00C8A5 0%, #0057B8 100%)' }}>
            {service.linkLabel} →
          </a>
        </div>
      </div>
    </div>
  )
}