"use client"

import { useEffect, useRef, useState, useCallback } from "react"

interface GameState {
  ballX: number
  ballY: number
  ballVX: number
  ballVY: number
  leftY: number
  rightY: number
  leftScore: number
  rightScore: number
  playing: boolean
  winner: "left" | "right" | null
}

const PADDLE_H = 80
const PADDLE_W = 8
const BALL_SIZE = 10
const SPEED_INCREMENT = 1.05
const WIN_SCORE = 7

export default function PongGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const stateRef = useRef<GameState>({
    ballX: 0,
    ballY: 0,
    ballVX: 4,
    ballVY: 3,
    leftY: 0,
    rightY: 0,
    leftScore: 0,
    rightScore: 0,
    playing: false,
    winner: null,
  })
  const keysRef = useRef<Set<string>>(new Set())
  const rafRef = useRef<number>(0)
  const [score, setScore] = useState({ left: 0, right: 0 })
  const [status, setStatus] = useState<"idle" | "playing" | "won">("idle")
  const [winner, setWinner] = useState<"left" | "right" | null>(null)

  const resetBall = useCallback((canvas: HTMLCanvasElement) => {
    const s = stateRef.current
    s.ballX = canvas.width / 2
    s.ballY = canvas.height / 2
    const dir = Math.random() > 0.5 ? 1 : -1
    s.ballVX = 4 * dir
    s.ballVY = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? 1 : -1)
  }, [])

  const startGame = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const s = stateRef.current
    s.leftY = canvas.height / 2 - PADDLE_H / 2
    s.rightY = canvas.height / 2 - PADDLE_H / 2
    s.leftScore = 0
    s.rightScore = 0
    s.winner = null
    s.playing = true
    resetBall(canvas)
    setScore({ left: 0, right: 0 })
    setStatus("playing")
    setWinner(null)
  }, [resetBall])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      canvas.width = parent.clientWidth
      canvas.height = Math.min(400, parent.clientWidth * 0.55)
      const s = stateRef.current
      s.leftY = canvas.height / 2 - PADDLE_H / 2
      s.rightY = canvas.height / 2 - PADDLE_H / 2
      if (!s.playing) resetBall(canvas)
    }

    resize()
    window.addEventListener("resize", resize)

    const onKey = (e: KeyboardEvent) => keysRef.current.add(e.key)
    const offKey = (e: KeyboardEvent) => keysRef.current.delete(e.key)
    window.addEventListener("keydown", onKey)
    window.addEventListener("keyup", offKey)

    const loop = () => {
      const s = stateRef.current
      const W = canvas.width
      const H = canvas.height

      // Clear
      ctx.fillStyle = "#111111"
      ctx.fillRect(0, 0, W, H)

      // Center dashes
      ctx.strokeStyle = "#333"
      ctx.setLineDash([8, 12])
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(W / 2, 0)
      ctx.lineTo(W / 2, H)
      ctx.stroke()
      ctx.setLineDash([])

      if (s.playing) {
        const keys = keysRef.current

        // Move paddles
        const SPEED = 6
        if (keys.has("w") || keys.has("W")) s.leftY = Math.max(0, s.leftY - SPEED)
        if (keys.has("s") || keys.has("S")) s.leftY = Math.min(H - PADDLE_H, s.leftY + SPEED)
        if (keys.has("ArrowUp")) s.rightY = Math.max(0, s.rightY - SPEED)
        if (keys.has("ArrowDown")) s.rightY = Math.min(H - PADDLE_H, s.rightY + SPEED)

        // Ball movement
        s.ballX += s.ballVX
        s.ballY += s.ballVY

        // Top/bottom bounce
        if (s.ballY <= 0) { s.ballY = 0; s.ballVY *= -1 }
        if (s.ballY + BALL_SIZE >= H) { s.ballY = H - BALL_SIZE; s.ballVY *= -1 }

        // Left paddle collision
        const LEFT_X = 20
        if (
          s.ballX <= LEFT_X + PADDLE_W &&
          s.ballX >= LEFT_X - 4 &&
          s.ballY + BALL_SIZE >= s.leftY &&
          s.ballY <= s.leftY + PADDLE_H
        ) {
          s.ballX = LEFT_X + PADDLE_W
          s.ballVX = Math.abs(s.ballVX) * SPEED_INCREMENT
          const relHit = (s.ballY + BALL_SIZE / 2 - (s.leftY + PADDLE_H / 2)) / (PADDLE_H / 2)
          s.ballVY = relHit * 5
        }

        // Right paddle collision
        const RIGHT_X = W - 20 - PADDLE_W
        if (
          s.ballX + BALL_SIZE >= RIGHT_X &&
          s.ballX + BALL_SIZE <= RIGHT_X + PADDLE_W + 4 &&
          s.ballY + BALL_SIZE >= s.rightY &&
          s.ballY <= s.rightY + PADDLE_H
        ) {
          s.ballX = RIGHT_X - BALL_SIZE
          s.ballVX = -Math.abs(s.ballVX) * SPEED_INCREMENT
          const relHit = (s.ballY + BALL_SIZE / 2 - (s.rightY + PADDLE_H / 2)) / (PADDLE_H / 2)
          s.ballVY = relHit * 5
        }

        // Cap speed
        s.ballVX = Math.max(-12, Math.min(12, s.ballVX))
        s.ballVY = Math.max(-10, Math.min(10, s.ballVY))

        // Score
        if (s.ballX < 0) {
          s.rightScore++
          setScore({ left: s.leftScore, right: s.rightScore })
          if (s.rightScore >= WIN_SCORE) {
            s.playing = false; s.winner = "right"; setStatus("won"); setWinner("right")
          } else resetBall(canvas)
        }
        if (s.ballX > W) {
          s.leftScore++
          setScore({ left: s.leftScore, right: s.rightScore })
          if (s.leftScore >= WIN_SCORE) {
            s.playing = false; s.winner = "left"; setStatus("won"); setWinner("left")
          } else resetBall(canvas)
        }
      }

      // Draw paddles (letters as paddles!)
      ctx.font = `bold ${PADDLE_H * 0.5}px "DM Serif Display", serif`
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"

      ctx.fillStyle = "#F5F5F0"
      ctx.fillText("W", 20 + PADDLE_W / 2, s.leftY + PADDLE_H / 2)

      ctx.fillStyle = "#F5F5F0"
      ctx.fillText("S", W - 20 - PADDLE_W / 2, s.rightY + PADDLE_H / 2)

      // Ball (as a dot or circle)
      if (s.playing || true) {
        ctx.fillStyle = "#C8F135"
        ctx.beginPath()
        ctx.arc(s.ballX + BALL_SIZE / 2, s.ballY + BALL_SIZE / 2, BALL_SIZE / 2, 0, Math.PI * 2)
        ctx.fill()
      }

      // Score display
      ctx.font = `400 ${Math.min(80, W * 0.12)}px "DM Serif Display", serif`
      ctx.textAlign = "center"
      ctx.textBaseline = "top"
      ctx.fillStyle = "rgba(245,245,240,0.15)"
      ctx.fillText(String(s.leftScore), W / 4, 20)
      ctx.fillText(String(s.rightScore), (W / 4) * 3, 20)

      rafRef.current = requestAnimationFrame(loop)
    }

    rafRef.current = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener("resize", resize)
      window.removeEventListener("keydown", onKey)
      window.removeEventListener("keyup", offKey)
    }
  }, [resetBall])

  return (
    <div className="w-full">
      {/* Canvas */}
      <div className="w-full rounded-sm overflow-hidden border border-card/40 bg-ink">
        <canvas ref={canvasRef} className="w-full block" />
      </div>

      {/* Controls / CTA */}
      <div className="mt-4 flex items-center justify-between flex-wrap gap-4">
        <div className="flex gap-6">
          <div className="font-mono text-xs text-muted">
            <span className="text-bg/60 bg-ink px-1.5 py-0.5 rounded mr-1.5">W</span>
            <span className="text-bg/60 bg-ink px-1.5 py-0.5 rounded mr-2">S</span>
            Left paddle
          </div>
          <div className="font-mono text-xs text-muted">
            <span className="text-bg/60 bg-ink px-1.5 py-0.5 rounded mr-1.5">↑</span>
            <span className="text-bg/60 bg-ink px-1.5 py-0.5 rounded mr-2">↓</span>
            Right paddle
          </div>
        </div>

        {status === "idle" && (
          <button
            onClick={startGame}
            data-cursor
            className="font-sans text-sm border border-ink px-6 py-2 hover:bg-ink hover:text-bg transition-colors duration-200"
          >
            Start game
          </button>
        )}
        {status === "won" && (
          <div className="flex items-center gap-4">
            <span className="font-display text-sm text-ink">
              {winner === "left" ? "Left" : "Right"} wins!
            </span>
            <button
              onClick={startGame}
              data-cursor
              className="font-sans text-sm border border-ink px-6 py-2 hover:bg-ink hover:text-bg transition-colors duration-200"
            >
              Play again
            </button>
          </div>
        )}
        {status === "playing" && (
          <div className="flex items-center gap-6">
            <span className="font-display text-2xl text-ink tabular-nums">
              {score.left} — {score.right}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
