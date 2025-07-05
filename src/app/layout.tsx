import type { Metadata } from "next"
import "./globals.css"
import { SessionProvider } from "./providers/SessionProvider"

export const metadata: Metadata = {
  title: "Medyanes Todo App",
  description: "Full Stack Todo Application",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}