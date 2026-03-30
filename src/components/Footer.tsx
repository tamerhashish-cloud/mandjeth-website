import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#102B46] text-white py-[5.25rem] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="border-t border-white/12 pt-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <Image
                src="/logo-pack/master/web/icons/MANDJETH-logo-horizontal-dark.png"
                alt="MANDJETH"
                width={260}
                height={60}
                className="h-[75px] w-auto object-contain mb-6"
              />
              <p className="text-slate-200/62 text-sm leading-7 max-w-sm">
                Maritime fuel, compliance and business advisory.
              </p>
            </div>
            <div>
              <h3 className="text-sm uppercase tracking-widest text-sand mb-5">Navigation</h3>
              <ul className="space-y-2 text-sm text-white/66">
                {['home', 'services', 'process', 'contact'].map((item) => (
                  <li key={item}>
                    <Link href={`#${item}`} className="hover:text-white transition-colors capitalize">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm uppercase tracking-widest text-sand mb-5">LOCATION</h3>
              <p className="text-white/62 text-sm leading-7">
                Copenhagen, Denmark<br />
                Serving clients globally
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
