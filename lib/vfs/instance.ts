import { VirtualFS } from './vfs'
import { buildVFSTree } from './vfs-tree'

export const vfs = new VirtualFS(buildVFSTree())
