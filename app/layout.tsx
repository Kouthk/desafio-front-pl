import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'DESAFIO FRONT-END SEPLAG - PJC',
  description: 'DESAFIO FRONT-END SEPLAG - PJC',
  generator: 'DESAFIO FRONT-END SEPLAG - PJC',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  )
}
