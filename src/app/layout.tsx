import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MANDJETH - Maritime Advisory',
  description: 'From fuel complexity to confident decisions',
  icons: {
    icon: '/logo-pack/master/web/icons/MANDJETH-favicon.png',
    apple: '/logo-pack/master/web/icons/MANDJETH-apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}