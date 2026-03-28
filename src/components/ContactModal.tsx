'use client'

import { FormEvent, useEffect, useRef, useState } from 'react'

type InquiryType = 'FuelEU / EU ETS Readiness' | 'Alternative Fuel Sourcing' | 'Decision Support' | 'Partnership' | 'Other'

type FormState = {
  name: string
  email: string
  company: string
  inquiryType: InquiryType
  message: string
  website: string
}

const initialFormState: FormState = {
  name: '',
  email: '',
  company: '',
  inquiryType: 'FuelEU / EU ETS Readiness',
  message: '',
  website: '',
}

export default function ContactModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [formData, setFormData] = useState<FormState>(initialFormState)
  const openButtonRef = useRef<HTMLButtonElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const triggerElement = openButtonRef.current

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
      triggerElement?.focus()
    }
  }, [isOpen])

  const openModal = () => {
    setError('')
    setSuccess('')
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  const updateField = (field: keyof FormState, value: string) => {
    setFormData((previous) => ({ ...previous, [field]: value }))
  }

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setSuccess('')

    if (!formData.name.trim() || !formData.email.trim() || !formData.company.trim() || !formData.message.trim()) {
      setError('Please complete name, email, company, and message before submitting.')
      return
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(formData.email)) {
      setError('Please enter a valid email address.')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const payload = (await response.json()) as { message?: string }

      if (!response.ok) {
        setError(payload.message ?? 'Your request could not be submitted. Please try again.')
        return
      }

      setSuccess('Thanks. Your inquiry has been received and we will contact you shortly.')
      setFormData(initialFormState)
    } catch {
      setError('A network error occurred while sending your inquiry. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <button
        ref={openButtonRef}
        type="button"
        onClick={openModal}
        className="inline-flex items-center justify-center rounded border border-[#102B46] bg-[#102B46] px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-all duration-200 hover:-translate-y-[1px] hover:bg-[#102B46]/90"
      >
        Book a call
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-[#102B46]/55 p-4"
          onClick={closeModal}
          role="presentation"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
            className="w-full max-w-2xl rounded-xl border border-[#E8EAEF] bg-white p-6 md:p-8 shadow-[0_20px_48px_rgba(16,43,70,0.25)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h3 id="contact-modal-title" className="text-2xl font-bold text-[#102B46]">
                  Share your business inquiry
                </h3>
                <p className="mt-2 text-sm text-[#5E6B78]">
                  Tell us about your challenge and we will respond with next steps.
                </p>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeModal}
                className="rounded border border-[#102B46]/25 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-[#102B46] transition-colors hover:bg-[#102B46]/5"
                aria-label="Close contact form"
              >
                Close
              </button>
            </div>

            <form className="space-y-4" onSubmit={submitForm} noValidate>
              <input
                type="text"
                name="website"
                autoComplete="off"
                tabIndex={-1}
                className="hidden"
                value={formData.website}
                onChange={(event) => updateField('website', event.target.value)}
              />

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[#102B46]">Name *</span>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={(event) => updateField('name', event.target.value)}
                    className="w-full rounded border border-[#D6D9DC] px-3 py-2.5 text-sm text-[#102B46] outline-none transition focus:border-[#102B46] focus:ring-2 focus:ring-[#102B46]/15"
                  />
                </label>

                <label className="block">
                  <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[#102B46]">Email *</span>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={(event) => updateField('email', event.target.value)}
                    className="w-full rounded border border-[#D6D9DC] px-3 py-2.5 text-sm text-[#102B46] outline-none transition focus:border-[#102B46] focus:ring-2 focus:ring-[#102B46]/15"
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[#102B46]">Company *</span>
                  <input
                    type="text"
                    name="company"
                    required
                    value={formData.company}
                    onChange={(event) => updateField('company', event.target.value)}
                    className="w-full rounded border border-[#D6D9DC] px-3 py-2.5 text-sm text-[#102B46] outline-none transition focus:border-[#102B46] focus:ring-2 focus:ring-[#102B46]/15"
                  />
                </label>

                <label className="block">
                  <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[#102B46]">Interest type</span>
                  <select
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={(event) => updateField('inquiryType', event.target.value)}
                    className="w-full rounded border border-[#D6D9DC] bg-white px-3 py-2.5 text-sm text-[#102B46] outline-none transition focus:border-[#102B46] focus:ring-2 focus:ring-[#102B46]/15"
                  >
                    <option>FuelEU / EU ETS Readiness</option>
                    <option>Alternative Fuel Sourcing</option>
                    <option>Decision Support</option>
                    <option>Partnership</option>
                    <option>Other</option>
                  </select>
                </label>
              </div>

              <label className="block">
                <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[#102B46]">Message *</span>
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(event) => updateField('message', event.target.value)}
                  className="w-full rounded border border-[#D6D9DC] px-3 py-2.5 text-sm text-[#102B46] outline-none transition focus:border-[#102B46] focus:ring-2 focus:ring-[#102B46]/15"
                  placeholder="Share your goals, timeline, or compliance challenge."
                />
              </label>

              {error && (
                <p className="rounded border border-[#9F1D1D]/25 bg-[#FDF0F0] px-3 py-2 text-sm text-[#9F1D1D]" role="alert">
                  {error}
                </p>
              )}

              {success && (
                <p className="rounded border border-[#1A6B3F]/25 bg-[#ECF8F1] px-3 py-2 text-sm text-[#1A6B3F]" role="status">
                  {success}
                </p>
              )}

              <div className="pt-1">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center rounded border border-[#102B46] bg-[#102B46] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-all duration-200 hover:-translate-y-[1px] hover:bg-[#102B46]/90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? 'Sending...' : 'Submit inquiry'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
