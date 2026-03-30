'use client'

import { useState, useRef, useEffect } from 'react'

interface ContactModalProps {
  isOpen?: boolean
  onClose?: () => void
}

export default function ContactModal({ isOpen = false, onClose }: ContactModalProps) {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    inquiryType: 'General Inquiry',
    message: '',
    website: '',
  })

  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [showModal, setShowModal] = useState(isOpen)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setShowModal(isOpen)
  }, [isOpen])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const validateForm = (): boolean => {
    const { name, email, company, message } = formState

    if (!name.trim() || !email.trim() || !company.trim() || !message.trim()) {
      setErrorMessage('Name, email, company, and message are required.')
      return false
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(email)) {
      setErrorMessage('Please provide a valid email address.')
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSuccessMessage('')
    setErrorMessage('')

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      })

      const data = await response.json()

      if (!response.ok) {
        setErrorMessage(data.message || 'An error occurred. Please try again.')
        setIsLoading(false)
        return
      }

      setSuccessMessage(data.message)
      setFormState({
        name: '',
        email: '',
        company: '',
        inquiryType: 'General Inquiry',
        message: '',
        website: '',
      })

      setTimeout(() => {
        setShowModal(false)
        onClose?.()
        setSuccessMessage('')
      }, 2000)
    } catch (error) {
      setErrorMessage('Failed to send inquiry. Please try again.')
      console.error('Form submission error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setShowModal(false)
    setErrorMessage('')
    setSuccessMessage('')
    onClose?.()
  }

  const handleEscapeKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      handleClose()
    }
  }

  if (!showModal) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onKeyDown={handleEscapeKey}
    >
      <div className="relative w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <button
          ref={closeButtonRef}
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl w-8 h-8 flex items-center justify-center"
          aria-label="Close modal"
        >
          ✕
        </button>

        <h2 id="modal-title" className="text-2xl font-bold mb-6 text-gray-900">
          Get in Touch
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={formState.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
              Company <span className="text-red-500">*</span>
            </label>
            <input
              id="company"
              type="text"
              name="company"
              value={formState.company}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your company"
            />
          </div>

          <div>
            <label htmlFor="inquiryType" className="block text-sm font-medium text-gray-700 mb-1">
              Type of Inquiry
            </label>
            <select
              id="inquiryType"
              name="inquiryType"
              value={formState.inquiryType}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>General Inquiry</option>
              <option>Sourcing Request</option>
              <option>Compliance Support</option>
              <option>Business Partnership</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formState.message}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Tell us more about your inquiry..."
            />
          </div>

          {/* Honeypot field */}
          <input type="hidden" name="website" value={formState.website} onChange={handleChange} />

          {successMessage && (
            <div
              className="p-3 bg-green-50 border border-green-200 text-green-700 rounded-md text-sm"
              role="alert"
              aria-live="polite"
            >
              {successMessage}
            </div>
          )}

          {errorMessage && (
            <div
              className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm"
              role="alert"
              aria-live="polite"
            >
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Sending...' : 'Send Inquiry'}
          </button>
        </form>
      </div>
    </div>
  )
}
