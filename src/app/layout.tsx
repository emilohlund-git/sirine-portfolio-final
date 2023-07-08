import { Analytics } from '@vercel/analytics/react'
import { Metadata } from 'next'
import { Raleway } from 'next/font/google'
import ScrollToTopButton from '../components/common/ScrollToTopButton'
import ContactModal from '../components/contact/ContactModal'
import './globals.css'
import Providers from './providers'

const raleway = Raleway({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sirine Harzallah - Portfolio',
  description: 'Personal portfolio website of Sirine Harzallah',
  icons: [
    {
      rel: "icon",
      type: "image/ico",
      sizes: "32x32",
      url: "/favicon.ico"
    },
    {
      rel: "icon",
      url: "/android-chrome-192x192.png",
      sizes: "192x192",
      type: "image/png"
    },
    {
      url: "/android-chrome-512x512.png",
      sizes: "512x512",
      type: "image/png",
    }
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html style={{
      scrollBehavior: 'smooth'
    }} data-theme="dark" lang="en">
      <body className={`${raleway.className} bg-base-100 text-base-context`}>
        <Providers>
          <ContactModal />
          {children}
          <Analytics />
          <ScrollToTopButton />
        </Providers>
      </body>
    </html>
  )
}
