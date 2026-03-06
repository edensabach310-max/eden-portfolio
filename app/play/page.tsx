"use client"

import { useState, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { STICKER_FILES } from "@/components/ui/Stickers"

const STICKER_SIZE = 120 // consistent size for all stickers on canvas

// ─── Canvas sticker (draggable, fixed size) ───────────────────────────────────

interface CanvasSticker {
  id: number
  src: string
  x: number
  y: number
  rotate: number
  label?: string // for custom text stickers
}

function DraggableSticker({ sticker, onRemove }: { sticker: CanvasSticker; onRemove: () => void }) {
  return (
    <motion.div
      drag
      dragMomentum={false}
      onDoubleClick={onRemove}
      style={{
        position: "fixed",
        left: sticker.x,
        top: sticker.y,
        width: STICKER_SIZE,
        height: STICKER_SIZE,
        cursor: "grab",
        touchAction: "none",
        zIndex: 10,
        filter: "drop-shadow(0 8px 20px rgba(0,0,0,0.2))",
      }}
      initial={{ scale: 0, rotate: sticker.rotate - 15 }}
      animate={{ scale: 1, rotate: sticker.rotate }}
      exit={{ scale: 0, transition: { duration: 0.15 } }}
      transition={{ type: "spring", stiffness: 320, damping: 18 }}
      whileDrag={{ scale: 1.12, cursor: "grabbing", zIndex: 50 }}
    >
      {sticker.label ? (
        <div
          className="w-full h-full rounded-full flex items-center justify-center bg-lime text-ink font-sans font-medium text-center"
          style={{ fontSize: "1rem", padding: "8px", wordBreak: "break-word", lineHeight: 1.2 }}
        >
          {sticker.label}
        </div>
      ) : (
        <Image
          src={sticker.src}
          alt=""
          fill
          style={{ objectFit: "contain", pointerEvents: "none" }}
        />
      )}
    </motion.div>
  )
}

// ─── Sticker sheet slot ───────────────────────────────────────────────────────

function StickerSlot({
  filename,
  peeled,
  onPeel,
}: {
  filename: string
  peeled: boolean
  onPeel: () => void
}) {
  return (
    <motion.div
      className="relative flex items-center justify-center"
      style={{ width: 90, height: 90 }}
    >
      {/* Dotted perforated border */}
      <div
        className="absolute inset-0 rounded-lg"
        style={{
          border: "1.5px dashed #D0D0C8",
          borderRadius: 10,
        }}
      />

      <AnimatePresence>
        {!peeled ? (
          <motion.button
            key="sticker"
            onClick={onPeel}
            className="relative w-full h-full p-2 flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92, rotate: -5 }}
            exit={{ scale: 0, opacity: 0, rotate: 20, transition: { duration: 0.25 } }}
            style={{ cursor: "pointer", touchAction: "none" }}
          >
            <Image
              src={`/stickers/${filename}`}
              alt={filename.replace(".png", "")}
              fill
              style={{ objectFit: "contain", padding: "8px", filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.12))" }}
            />
          </motion.button>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full h-full rounded-lg"
            style={{ background: "#F0EFE8" }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function StickersPage() {
  const [canvasStickers, setCanvasStickers] = useState<CanvasSticker[]>([])
  const [peeled, setPeeled] = useState<Set<string>>(new Set())
  const [customText, setCustomText] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  const peelSticker = useCallback((filename: string) => {
    setPeeled((p) => new Set([...p, filename]))
    const x = window.innerWidth * 0.25 + Math.random() * window.innerWidth * 0.4
    const y = 120 + Math.random() * (window.innerHeight - 350)
    const rotate = (Math.random() - 0.5) * 24
    setCanvasStickers((prev) => [
      ...prev,
      { id: Date.now() + Math.random(), src: `/stickers/${filename}`, x, y, rotate },
    ])
  }, [])

  const createTextSticker = useCallback(() => {
    if (!customText.trim()) return
    const x = window.innerWidth * 0.3 + Math.random() * window.innerWidth * 0.3
    const y = 150 + Math.random() * (window.innerHeight - 350)
    const rotate = (Math.random() - 0.5) * 16
    setCanvasStickers((prev) => [
      ...prev,
      { id: Date.now() + Math.random(), src: "", x, y, rotate, label: customText.trim() },
    ])
    setCustomText("")
    inputRef.current?.blur()
  }, [customText])

  const removeSticker = useCallback((id: number) => {
    setCanvasStickers((prev) => prev.filter((s) => s.id !== id))
  }, [])

  const resetSheet = useCallback(() => {
    setPeeled(new Set())
    setCanvasStickers([])
  }, [])

  return (
    <div className="min-h-screen pt-28 pb-32 px-6 md:px-12" style={{ userSelect: "none" }}>

      {/* Header */}
      <div className="mb-12 flex items-end justify-between">
        <div>
          <p className="font-sans text-3xl font-light text-ink">Stickers</p>
          <p className="font-sans text-3xl font-light text-muted/50 mt-1">
            peel · drag · double-click to remove
          </p>
        </div>
        {peeled.size > 0 && (
          <button
            onClick={resetSheet}
            className="font-sans text-3xl font-light text-muted hover:text-ink transition-colors"
          >
            reset
          </button>
        )}
      </div>

      {/* Sticker sheet + create sticker */}
      <div className="flex flex-col md:flex-row gap-12 items-start">

        {/* The physical sticker sheet */}
        <motion.div
          className="flex-shrink-0"
          style={{
            background: "#FFFFFF",
            borderRadius: 16,
            padding: 28,
            boxShadow: "0 4px 32px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(5, 90px)" }}>
            {STICKER_FILES.map((filename) => (
              <StickerSlot
                key={filename}
                filename={filename}
                peeled={peeled.has(filename)}
                onPeel={() => peelSticker(filename)}
              />
            ))}
          </div>
        </motion.div>

        {/* Create your own sticker */}
        <motion.div
          className="flex flex-col gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-sans text-3xl font-light text-muted">Create a sticker</p>
          <div className="flex items-center gap-3">
            <input
              ref={inputRef}
              type="text"
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && createTextSticker()}
              placeholder="type anything..."
              maxLength={24}
              className="font-sans text-xl font-light text-ink bg-transparent border-b border-ink/30 focus:border-ink outline-none pb-1 w-52 placeholder:text-muted/40 transition-colors"
            />
            <button
              onClick={createTextSticker}
              className="font-sans text-3xl font-light text-muted hover:text-ink transition-colors"
            >
              →
            </button>
          </div>
          <p className="font-sans text-xl font-light text-muted/40">press enter or →</p>
        </motion.div>

      </div>

      {/* Canvas stickers (floating above everything) */}
      <AnimatePresence>
        {canvasStickers.map((s) => (
          <DraggableSticker
            key={s.id}
            sticker={s}
            onRemove={() => removeSticker(s.id)}
          />
        ))}
      </AnimatePresence>

    </div>
  )
}
