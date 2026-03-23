import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-[#102B46]">
      <Header />

      {/* Hero */}
      <section id="home" className="relative overflow-hidden pt-24 pb-32 md:pt-28 md:pb-36">
        <div className="hidden lg:block absolute top-8 right-16 pointer-events-none">
          <Image
            src="/logo-pack/master/web/icons/MANDJETH-icon.png"
            alt="MANDJETH watermark"
            width={480}
            height={480}
            className="h-96 w-96 object-contain opacity-[0.2]"
            priority
          />
        </div>
        <div className="relative max-w-5xl mx-auto px-6">
          <div className="max-w-xl">
            <div className="text-sm uppercase tracking-widest font-extrabold text-[#102B46] mb-1">MANDJETH</div>
            <p className="text-xs uppercase tracking-widest text-[#5E6B78] mb-2">Maritime Advisory</p>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight text-[#102B46] mb-6">
              From fuel complexity to confident decisions
            </h1>
            <p className="text-base md:text-lg text-[#5E6B78] leading-relaxed mb-8">
              MANDJETH helps maritime organizations navigate FuelEU, EU ETS, and fuel sourcing decisions with clarity and structure.
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded border border-[#102B46] bg-[#102B46] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-all duration-200 hover:-translate-y-[1px] hover:bg-[#102B46]/90"
              >
                Book a call
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center rounded border border-[#102B46] text-[#102B46] px-6 py-3 text-sm font-semibold uppercase tracking-wide transition-all duration-200 hover:-translate-y-[1px] hover:bg-[#102B46] hover:text-white"
              >
                Explore services
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="pt-32 pb-28 md:pt-40 md:pb-36">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-11">
            <h2 className="text-3xl md:text-4xl font-bold text-[#102B46]">Our Services</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <article className="h-full bg-white border border-[#E8EAEF] p-8 rounded-xl shadow-[0_8px_24px_rgba(16,43,70,0.06)] transition-all duration-200 hover:-translate-y-[2px] hover:shadow-[0_14px_30px_rgba(16,43,70,0.1)]">
              <div className="mb-5">
                <svg className="w-10 h-10 text-[#102B46]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.3" aria-hidden="true">
                  <rect x="5" y="4" width="14" height="16" rx="2" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 8h8M8 12h4" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l1.7 1.7L16 14.4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#102B46] mb-2">FuelEU / EU ETS Readiness</h3>
              <p className="text-[#5E6B78]/82 text-sm leading-relaxed">
                Assess exposure, implications, and compliance priorities.
              </p>
            </article>

            <article className="h-full bg-white border border-[#E8EAEF] p-8 rounded-xl shadow-[0_8px_24px_rgba(16,43,70,0.06)] transition-all duration-200 hover:-translate-y-[2px] hover:shadow-[0_14px_30px_rgba(16,43,70,0.1)]">
              <div className="mb-5">
                <svg className="w-10 h-10 text-[#102B46]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.3" aria-hidden="true">
                  <circle cx="5" cy="12" r="2" />
                  <circle cx="12" cy="6" r="2" />
                  <circle cx="19" cy="12" r="2" />
                  <circle cx="12" cy="18" r="2" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.8 10.6l3.4-3M13.8 7.6l3.4 3M13.6 16.7l3.2-3.2M10.4 16.7l-3.2-3.2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#102B46] mb-2">Alternative Fuel Sourcing</h3>
              <p className="text-[#5E6B78]/82 text-sm leading-relaxed">
                Compare pathways, suppliers, and trade-offs.
              </p>
            </article>

            <article className="h-full bg-white border border-[#E8EAEF] p-8 rounded-xl shadow-[0_8px_24px_rgba(16,43,70,0.06)] transition-all duration-200 hover:-translate-y-[2px] hover:shadow-[0_14px_30px_rgba(16,43,70,0.1)]">
              <div className="mb-5">
                <svg className="w-10 h-10 text-[#102B46]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.3" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 4v16" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 8h11l-2.5 3 2.5 3H6" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 20l3-3m0 0l3 3m-3-3v-6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#102B46] mb-2">Decision Support</h3>
              <p className="text-[#5E6B78]/82 text-sm leading-relaxed">
                Enable leadership teams with structured decision-making.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="py-28 md:py-36 bg-[#F7F7F8]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#102B46]">A structured path to decision-making</h2>
          </div>
          <div className="relative">
            <div className="hidden lg:block absolute left-[7%] right-[7%] top-4 h-px bg-gradient-to-r from-transparent via-[#102B46]/18 to-transparent" aria-hidden="true" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 relative">
            {[
              { label: 'Assess', text: 'Start with a rigorous assessment of position and risk.', icon: 'assess' },
              { label: 'Compare', text: 'Explore scenarios, costs, and compliance outcomes.', icon: 'compare' },
              { label: 'Decide', text: 'Choose a clear, data-backed path forward.', icon: 'decide' },
              { label: 'Execute', text: 'Support deployment with measured oversight.', icon: 'execute' },
            ].map((step) => (
              <div key={step.label} className="border border-[#D6D9DC] rounded-xl p-6 transition-all duration-200 hover:-translate-y-[1px] hover:shadow-[0_10px_24px_rgba(16,43,70,0.08)]">
                <div className="mb-4 h-8 w-8 flex items-center justify-center">
                  {step.icon === 'assess' && (
                    <svg className="w-8 h-8 text-[#102B46]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.2" aria-hidden="true">
                      <circle cx="11" cy="11" r="6" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 16l4 4" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.5 11h5" />
                    </svg>
                  )}
                  {step.icon === 'compare' && (
                    <svg className="w-8 h-8 text-[#102B46]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.2" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h7l-2.2 3L11 13H4" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20 17h-7l2.2-3L13 11h7" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14" />
                    </svg>
                  )}
                  {step.icon === 'decide' && (
                    <svg className="w-8 h-8 text-[#102B46]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.2" aria-hidden="true">
                      <circle cx="12" cy="6" r="1.8" />
                      <circle cx="7" cy="17" r="1.8" />
                      <circle cx="17" cy="17" r="1.8" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 0l-4 3m4-3l4 3" />
                    </svg>
                  )}
                  {step.icon === 'execute' && (
                    <svg className="w-8 h-8 text-[#102B46]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.2" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 17h3m2 0h3m2 0h3" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13h9" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 9l3 3-3 3" />
                    </svg>
                  )}
                </div>
                <h3 className="text-xl font-bold text-[#102B46] mb-3">{step.label}</h3>
                <p className="text-[#5E6B78]/66 text-sm leading-relaxed">{step.text}</p>
              </div>
            ))}
            </div>
          </div>
        </div>
      </section>

      {/* Navy section */}
      <section className="bg-gradient-to-b from-[#102B46] to-[#0F2D49] text-white py-[7rem] md:py-[9rem]">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-5">Built for complex maritime transition decisions</h2>
          <p className="text-sm md:text-base text-[#D8C3A5]/72 max-w-2xl mx-auto leading-relaxed">
            MANDJETH provides precise guidance for fuel, compliance, and sourcing transitions.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section id="contact" className="py-24 md:py-28">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#102B46] mb-4">Let’s discuss your challenge</h2>
          <p className="text-[#5E6B78]/88 mb-8">Connect to define a structured roadmap for your maritime fuel and compliance needs.</p>
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded border border-[#102B46] bg-[#102B46] px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-all duration-200 hover:-translate-y-[1px] hover:bg-[#102B46]/90"
          >
            Book a call
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}