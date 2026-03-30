import Image from 'next/image'
import Link from 'next/link'

interface HeaderProps {
  onContactClick?: () => void
}

export default function Header({ onContactClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 md:px-6 py-4">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo-pack/master/web/icons/MANDJETH-logo-horizontal.png"
            alt="MANDJETH"
            width={260}
            height={48}
            className="h-[34px] md:h-[50px] w-auto object-contain"
            priority
          />
        </Link>

        <div className="hidden md:flex items-center gap-10">
          <nav className="flex items-center gap-7 text-sm uppercase tracking-[0.12em] text-[#5E6B78]/80">
            {['Home', 'Services', 'Process', 'Contact'].map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                className="transition-colors hover:text-[#102B46]"
              >
                {item}
              </Link>
            ))}
          </nav>

          <button
            onClick={onContactClick}
            className="inline-flex items-center justify-center rounded border border-[#102B46] bg-[#102B46] px-5 py-2 text-xs font-semibold uppercase tracking-widest text-white transition-all duration-200 hover:-translate-y-[1px] hover:bg-[#102B46]/90"
          >
            Book a call
          </button>
        </div>
      </div>
    </header>
  )
}