import type { Metadata } from "next"
import { Inter } from "next/font/google"

import "./globals.css"

const inter = Inter({
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "TikTok Downloader",
  description: "download video tiktok tanpa watermark"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  return (
    <html lang="id">

      <body className={`${inter.className} bg-[#07111f] text-white`}>

        {children}

      </body>

    </html>
  )
}