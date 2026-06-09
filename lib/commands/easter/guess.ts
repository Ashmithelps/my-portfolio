import type { Command } from '@/lib/shell/types'

const guess: Command = {
  name: 'guess',
  aliases: [],
  description: 'Play a number guessing game',
  usage: 'guess [number]',
  hidden: true,
  handler({ args }) {
    // Seed is based on the date so it changes daily but is consistent per session hint
    const target = (new Date().getDate() % 10) + 1 // 1-10

    if (!args[0]) {
      return [
        { type: 'text', value: "I'm thinking of a number between 1 and 10.", className: 'text-bright' },
        { type: 'text', value: 'Usage: guess <number>' },
      ]
    }

    const n = parseInt(args[0], 10)
    if (isNaN(n) || n < 1 || n > 10) {
      return [{ type: 'error', value: 'Please guess a number between 1 and 10.' }]
    }

    if (n === target) {
      return [
        { type: 'success', value: `🎉 Correct! The number was ${target}.` },
        { type: 'text', value: 'You have excellent taste in numbers.', className: 'text-dim' },
      ]
    }

    return [
      { type: 'warning', value: `${n < target ? 'Too low!' : 'Too high!'} Try again: guess <number>` },
    ]
  },
}

export default guess
