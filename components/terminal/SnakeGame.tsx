'use client'

import { useEffect, useRef, useCallback } from 'react'
import type { Theme } from '@/styles/themes'

type Dir = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT'
type Point = { x: number; y: number }

const COLS = 20
const ROWS = 12
const CELL = 16
const TICK = 150

export default function SnakeGame({ theme }: { theme: Theme }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const stateRef = useRef({
    snake: [{ x: 10, y: 6 }] as Point[],
    food: { x: 5, y: 5 } as Point,
    dir: 'RIGHT' as Dir,
    next: 'RIGHT' as Dir,
    score: 0,
    alive: true,
  })
  const rafRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const randomFood = useCallback((snake: Point[]): Point => {
    let f: Point
    do {
      f = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) }
    } while (snake.some((s) => s.x === f.x && s.y === f.y))
    return f
  }, [])

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const s = stateRef.current

    ctx.fillStyle = theme.bg
    ctx.fillRect(0, 0, COLS * CELL, ROWS * CELL)

    ctx.fillStyle = theme.success
    for (const seg of s.snake) {
      ctx.fillRect(seg.x * CELL + 1, seg.y * CELL + 1, CELL - 2, CELL - 2)
    }

    ctx.fillStyle = theme.error
    ctx.fillRect(s.food.x * CELL + 2, s.food.y * CELL + 2, CELL - 4, CELL - 4)

    ctx.fillStyle = theme.text
    ctx.font = '10px monospace'
    ctx.fillText(`Score: ${s.score}`, 4, ROWS * CELL - 4)

    if (!s.alive) {
      ctx.fillStyle = theme.error
      ctx.font = 'bold 14px monospace'
      const msg = `GAME OVER — Score: ${s.score}`
      ctx.fillText(msg, (COLS * CELL - ctx.measureText(msg).width) / 2, (ROWS * CELL) / 2)
      ctx.font = '10px monospace'
      ctx.fillStyle = theme.textDim
      const sub = 'Press R to restart'
      ctx.fillText(sub, (COLS * CELL - ctx.measureText(sub).width) / 2, (ROWS * CELL) / 2 + 18)
    }
  }, [theme])

  const tick = useCallback(() => {
    const s = stateRef.current
    if (!s.alive) return
    s.dir = s.next
    const head = s.snake[0]
    const newHead: Point = {
      x: (head.x + (s.dir === 'RIGHT' ? 1 : s.dir === 'LEFT' ? -1 : 0) + COLS) % COLS,
      y: (head.y + (s.dir === 'DOWN' ? 1 : s.dir === 'UP' ? -1 : 0) + ROWS) % ROWS,
    }
    if (s.snake.slice(1).some((seg) => seg.x === newHead.x && seg.y === newHead.y)) {
      s.alive = false
      draw()
      return
    }
    s.snake.unshift(newHead)
    if (newHead.x === s.food.x && newHead.y === s.food.y) {
      s.score += 10
      s.food = randomFood(s.snake)
    } else {
      s.snake.pop()
    }
    draw()
  }, [draw, randomFood])

  useEffect(() => {
    draw()
    rafRef.current = setInterval(tick, TICK)

    const onKey = (e: KeyboardEvent) => {
      const s = stateRef.current
      const map: Record<string, Dir> = {
        ArrowUp: 'UP', w: 'UP', W: 'UP',
        ArrowDown: 'DOWN', s: 'DOWN', S: 'DOWN',
        ArrowLeft: 'LEFT', a: 'LEFT', A: 'LEFT',
        ArrowRight: 'RIGHT', d: 'RIGHT', D: 'RIGHT',
      }
      const newDir = map[e.key]
      if (newDir) {
        const opposites: Record<Dir, Dir> = { UP: 'DOWN', DOWN: 'UP', LEFT: 'RIGHT', RIGHT: 'LEFT' }
        if (s.dir !== opposites[newDir]) {
          s.next = newDir
          e.preventDefault()
        }
      }
      if ((e.key === 'r' || e.key === 'R') && !s.alive) {
        s.snake = [{ x: 10, y: 6 }]
        s.dir = 'RIGHT'
        s.next = 'RIGHT'
        s.score = 0
        s.alive = true
        s.food = randomFood(s.snake)
      }
    }

    window.addEventListener('keydown', onKey)
    return () => {
      if (rafRef.current) clearInterval(rafRef.current)
      window.removeEventListener('keydown', onKey)
    }
  }, [tick, draw, randomFood])

  return (
    <div className="my-2">
      <canvas
        ref={canvasRef}
        width={COLS * CELL}
        height={ROWS * CELL}
        style={{ border: `1px solid ${theme.border}`, display: 'block' }}
        aria-label="Snake game"
      />
      <p style={{ color: theme.textDim, fontSize: '11px', marginTop: '4px' }}>
        Arrow keys / WASD to move · R to restart
      </p>
    </div>
  )
}
