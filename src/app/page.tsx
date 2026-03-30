'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ContactModal from '@/components/ContactModal'

export default function Home() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)

  const openContactModal = () => setIsContactModalOpen(true)
  const closeContactModal = () => setIsContactModalOpen(false)

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header onContactClick={openContactModal} />

      <main className="flex-1">
        {/* Hero Section */}
        <section id="home" className="bg-gradient-to-br from-[#102B46] to-[#1a3d5c] text-white py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-5xl font-bold mb-6">Maritime Fuel & Compliance Advisory</h1>
            <p className="text-xl text-slate-200 mb-8 max-w-2xl">
              Expert guidance on maritime fuel sourcing, compliance, and business strategy for global shipping operations.
            </p>
            <button
              onClick={openContactModal}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              Get In Touch
            </button>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 px-6 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center text-gray-900">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Fuel Sourcing',
                  description: 'Strategic sourcing of compliant marine fuels with competitive pricing and reliable supply chains.',
                },
                {
                  title: 'Compliance Support',
                  description: 'Expert guidance on IMO regulations, sulfur cap compliance, and environmental standards.',
                },
                {
                  title: 'Business Advisory',
                  description: 'Strategic consultation on operational efficiency, cost optimization, and market positioning.',
                },
              ].map((service, index) => (
                <div key={index} className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section id="process" className="py-20 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center text-gray-900">Our Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                {
                  step: '1',
                  title: 'Assessment',
                  description: 'Understand your needs and operational requirements',
                },
                {
                  step: '2',
                  title: 'Strategy',
                  description: 'Develop customized solutions aligned with your goals',
                },
                {
                  step: '3',
                  title: 'Implementation',
                  description: 'Execute solutions with ongoing support and monitoring',
                },
                {
                  step: '4',
                  title: 'Optimization',
                  description: 'Continuous improvement and market adaptation',
                },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="bg-blue-600 text-white text-2xl font-bold rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-6 bg-slate-50">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6 text-gray-900">Ready to Work Together?</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Let's discuss how we can help optimize your maritime operations and ensure compliance with industry standards.
            </p>
            <button
              onClick={openContactModal}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors inline-block"
            >
              Start a Conversation
            </button>
          </div>
        </section>
      </main>

      <Footer />

      {/* Contact Modal */}
      <ContactModal isOpen={isContactModalOpen} onClose={closeContactModal} />
    </div>
  )
}
