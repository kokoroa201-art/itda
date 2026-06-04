'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

const STATUS_LABEL = {
  pending:   { text: '대기',   color: 'bg-yellow-100 text-yellow-800' },
  contacted: { text: '연락됨', color: 'bg-blue-100 text-blue-800' },
  completed: { text: '완료',   color: 'bg-green-100 text-green-800' },
}

const SERVICE_LABEL = {
  free:         '무료 절차 안내',
  financial:    '금융·계좌 정리',
  telecom:      '통신·요금 해지',
  government:   '정부24·행정',
  sns:          'SNS·디지털 계정',
  subscription: '구독 서비스',
  inheritance:  '상속 준비 서류',
  premium:      '전문가 도움 (종합)',
}

export default function AdminPage() {
  const [rows, setRows]     = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]   = useState('')
  const [filter, setFilter] = useState('all')

  useEffect(() => { fetchData() }, [])

  async function fetchData() {
    setLoading(true)
    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) setError(error.message)
    else setRows(data || [])
    setLoading(false)
  }

  async function updateStatus(id, status) {
    const { error } = await supabase
      .from('applications')
      .update({ status })
      .eq('id', id)

    if (!error) setRows(prev => prev.map(r => r.id === id ? { ...r, status } : r))
  }

  const filtered = filter === 'all' ? rows : rows.filter(r => r.status === filter)

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/img/itda_logo_gradation.png" alt="잇다" className="h-8 w-auto"
            onError={e => { e.currentTarget.style.display = 'none' }} />
          <span className="text-lg font-bold text-gray-800">신청 관리</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">전체 {rows.length}건</span>
          <button onClick={fetchData}
            className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
            새로고침
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-6">
        {/* 필터 탭 */}
        <div className="flex gap-2 mb-5">
          {['all', 'pending', 'contacted', 'completed'].map(f => (
            <button key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                filter === f
                  ? 'bg-[#0057B8] text-white'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {f === 'all' ? '전체' : STATUS_LABEL[f].text}
              <span className="ml-1.5 text-xs opacity-70">
                {f === 'all' ? rows.length : rows.filter(r => r.status === f).length}
              </span>
            </button>
          ))}
        </div>

        {loading && (
          <div className="text-center py-20 text-gray-400">불러오는 중...</div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700 mb-4">
            오류: {error}
            <br />
            <span className="text-xs text-red-500">Supabase에 applications 테이블이 있는지, RLS 정책이 올바른지 확인하세요.</span>
          </div>
        )}

        {!loading && !error && (
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50 text-left">
                  <th className="px-5 py-3 font-semibold text-gray-600">접수일시</th>
                  <th className="px-5 py-3 font-semibold text-gray-600">이름</th>
                  <th className="px-5 py-3 font-semibold text-gray-600">연락처</th>
                  <th className="px-5 py-3 font-semibold text-gray-600">이메일</th>
                  <th className="px-5 py-3 font-semibold text-gray-600">신청 서비스</th>
                  <th className="px-5 py-3 font-semibold text-gray-600">문의 내용</th>
                  <th className="px-5 py-3 font-semibold text-gray-600">상태</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={7} className="text-center py-16 text-gray-400">
                      신청 내역이 없습니다.
                    </td>
                  </tr>
                )}
                {filtered.map(row => (
                  <tr key={row.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-3.5 text-gray-500 whitespace-nowrap">
                      {new Date(row.created_at).toLocaleString('ko-KR', {
                        month: '2-digit', day: '2-digit',
                        hour: '2-digit', minute: '2-digit',
                      })}
                    </td>
                    <td className="px-5 py-3.5 font-medium text-gray-900">{row.name}</td>
                    <td className="px-5 py-3.5 text-gray-700">{row.phone}</td>
                    <td className="px-5 py-3.5 text-gray-500">{row.email || '—'}</td>
                    <td className="px-5 py-3.5">
                      <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium">
                        {SERVICE_LABEL[row.service_type] || row.service_type}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-gray-500 max-w-xs">
                      <span className="line-clamp-2">{row.message || '—'}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <select
                        value={row.status}
                        onChange={e => updateStatus(row.id, e.target.value)}
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full border-0 cursor-pointer ${STATUS_LABEL[row.status]?.color || 'bg-gray-100 text-gray-700'}`}
                      >
                        <option value="pending">대기</option>
                        <option value="contacted">연락됨</option>
                        <option value="completed">완료</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  )
}