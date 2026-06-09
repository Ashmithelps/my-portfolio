import { CommandRegistry } from '@/lib/shell/registry'

// Core commands
import help from './help'
import man from './man'
import whoami from './whoami'
import ls from './ls'
import cd from './cd'
import pwd from './pwd'
import cat from './cat'
import tree from './tree'
import projectsCmd from './projects'
import skillsCmd from './skills'
import resumeCmd from './resume'
import contact from './contact'
import socials from './socials'
import clear from './clear'
import historyCmd from './history'
import echo from './echo'
import themeCmd from './theme'
import bannerCmd from './banner'
import menu from './menu'

// Easter eggs
import sudo from './easter/sudo'
import rm from './easter/rm'
import matrix from './easter/matrix'
import coffee from './easter/coffee'
import snake from './easter/snake'
import guess from './easter/guess'

export const registry = new CommandRegistry()

const commands = [
  help, man, whoami, ls, cd, pwd, cat, tree,
  projectsCmd, skillsCmd, resumeCmd, contact, socials,
  clear, historyCmd, echo, themeCmd, bannerCmd, menu,
  sudo, rm, matrix, coffee, snake, guess,
]

for (const cmd of commands) {
  registry.register(cmd)
}
