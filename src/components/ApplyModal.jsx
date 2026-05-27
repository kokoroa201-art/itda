'use client'

import { useState, useEffect, useRef } from 'react'
import { supabase } from '../lib/supabase'

const SERVICE_OPTIONS = [
  { value: 'free', label: '무료 절차 안내 신청' },
  { value: 'financial', label: '금융·계좌 정리' },
  { value: 'telecom', label: '통신·요금 해지' },
  { value: 'government', label: '정부24·행정 처리' },
  { value: 'sns', label: 'SNS·디지털 계정 정리' },
  { value: 'subscription', label: '구독 서비스 확인' },
  { value: 'inheritance', label: '상속 준비 서류' },
  { value: 'premium', label: '전문가 도움 요청 (종합)' },
]

export default function ApplyModal({ open, onClose, defaultType = 'free' }) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    service_type: defaultType,
    message: '',
    privacy_agreed: false,
  })
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('')
  const firstInputRef = useRef(null)

  useEffect(() => {
    if (open) {
      setForm(prev => ({ ...prev, service_type: defaultType }))
      setStatus('idle')
      setErrorMsg('')
      setTimeout(() => firstInputRef.current?.focus(), 50)
    }
  }, [open, defaultType])

  useEffect(() => {
    if (!open) return
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [open, onClose])

  const set = (field) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const validate = () => {
    if (!form.name.trim()) return '이름을 입력해주세요.'
    if (!form.phone.trim()) return '연락처를 입력해주세요.'
    if (!/^[0-9\-+\s]{9,15}$/.test(form.phone.replace(/\s/g, ''))) return '올바른 연락처를 입력해주세요.'
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return '올바른 이메일을 입력해주세요.'
    if (!form.privacy_agreed) return '개인정보처리방침에 동의해주세요.'
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const err = validate()
    if (err) { setErrorMsg(err); return }

    setStatus('loading')
    setErrorMsg('')

    const { error } = await supabase.from('applications').insert({
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim() || null,
      service_type: form.service_type,
      message: form.message.trim() || null,
      privacy_agreed: true,
    })

    if (error) {
      setStatus('error')
      setErrorMsg('신청 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.')
    } else {
      setStatus('success')
    }
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="서비스 신청"
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="h-1.5 w-full" style={{ background: 'linear-gradient(90deg, #00C8A5, #0057B8)' }} />

        <div className="px-7 pt-6 pb-7">
          {status === 'success' ? (
            <SuccessView onClose={onClose} />
          ) : (
            <>
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">서비스 신청</h2>
                  <p className="text-sm text-gray-500 mt-0.5">담당자가 확인 후 빠르게 연락드립니다.</p>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-1 -mr-1 -mt-1"
                  aria-label="닫기"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Field label="이름" required>
                    <input
                      ref={firstInputRef}
                      type="text"
                      placeholder="홍길동"
                      value={form.name}
                      onChange={set('name')}
                      className={inputCls}
                      required
                    />
                  </Field>
                  <Field label="연락처" required>
                    <input
                      type="tel"
                      placeholder="010-0000-0000"
                      value={form.phone}
                      onChange={set('phone')}
                      className={inputCls}
                      required
                    />
                  </Field>
                </div>

                <Field label="이메일">
                  <input
                    type="email"
                    placeholder="example@email.com (선택)"
                    value={form.email}
                    onChange={set('email')}
                    className={inputCls}
                  />
                </Field>

                <Field label="신청 서비스" required>
                  <select
                    value={form.service_type}
                    onChange={set('service_type')}
                    className={inputCls}
                  >
                    {SERVICE_OPTIONS.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </Field>

                <Field label="문의 내용">
                  <textarea
                    placeholder="상황을 간략하게 설명해주세요. (선택)"
                    value={form.message}
                    onChange={set('message')}
                    rows={3}
                    className={`${inputCls} resize-none`}
                  />
                </Field>

                <label className="flex items-start gap-2.5 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={form.privacy_agreed}
                    onChange={set('privacy_agreed')}
                    className="mt-0.5 w-4 h-4 rounded accent-teal-500 cursor-pointer shrink-0"
                  />
                  <span className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
                    <span className="text-red-500 font-medium">[필수] </span>
                    <a href="#" className="underline underline-offset-2 hover:text-teal-600">개인정보처리방침</a>에 동의합니다.
                  </span>
                </label>

                {errorMsg && (
                  <p className="text-sm text-red-500 flex items-center gap-1.5">
                    <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-3 rounded-xl text-white font-semibold text-sm tracking-wide transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ background: 'linear-gradient(90deg, #00C8A5, #0057B8)' }}
                >
                  {status === 'loading' ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      제출 중...
                    </span>
                  ) : '신청하기'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

function Field({ label, required, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}
        {required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  )
}

function SuccessView({ onClose }) {
  return (
    <div className="py-6 text-center">
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
        style={{ background: 'linear-gradient(135deg, #00C8A5, #0057B8)' }}
      >
        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">신청이 완료되었습니다!</h3>
      <p className="text-sm text-gray-500 mb-6 leading-relaxed">
        담당자가 영업일 기준 1~2일 내에<br />입력하신 연락처로 연락드리겠습니다.
      </p>
      <button
        onClick={onClose}
        className="px-8 py-2.5 rounded-xl text-white font-semibold text-sm transition-all"
        style={{ background: 'linear-gradient(90deg, #00C8A5, #0057B8)' }}
      >
        확인
      </button>
    </div>
  )
}

const inputCls = [
  'w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200',
  'focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:border-teal-400',
  'placeholder:text-gray-300 bg-gray-50 transition-colors',
].join(' ')
