import type { Command } from '@/lib/shell/types'
import { getBannerLines } from '@/lib/shell/banner'

const bannerCmd: Command = {
  name: 'banner',
  aliases: [],
  description: 'Re-display the welcome banner',
  usage: 'banner',
  handler() {
    return getBannerLines()
  },
}

export default bannerCmd
