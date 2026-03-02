"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

function LiveClock() {
  const [time, setTime] = useState("")

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      setTime(
        now.toLocaleTimeString("en-IL", {
          timeZone: "Asia/Jerusalem",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      )
    }
    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <span className="font-mono text-xs text-muted tabular-nums" suppressHydrationWarning>
      TLV {time}
    </span>
  )
}

export default function Footer() {
  return (
    <footer className="border-t border-card mt-32 px-6 md:px-12 py-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <span className="font-sans text-sm text-muted">© 2024 Eden Sabach</span>
          <LiveClock />
        </div>

        <div className="flex items-center gap-6 font-sans text-sm">
          <Link href="mailto:eden@example.com" className="text-muted hover:text-ink transition-colors hover-underline">
            Email
          </Link>
          <Link
            href="https://linkedin.com/in/eden-sabach"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-ink transition-colors hover-underline"
          >
            LinkedIn
          </Link>
          <span className="text-muted text-xs">↑ ↑ ↓ ↓ ← → ← → B A</span>
        </div>
      </div>
    </footer>
  )
}
