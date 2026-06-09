import type { VFSDir, VFSNode, VFSOutcome } from './types'

export class VirtualFS {
  constructor(private root: VFSDir) {}

  resolve(path: string, cwd: string = '/'): VFSOutcome<VFSNode> {
    const parts = this.splitPath(this.absolutize(path, cwd))
    let node: VFSNode = this.root
    for (const part of parts) {
      if (node.kind !== 'dir') {
        return { ok: false, error: `not a directory: ${part}` }
      }
      const child: VFSNode | undefined = node.children[part]
      if (!child) {
        return { ok: false, error: `no such file or directory: ${path}` }
      }
      node = child
    }
    return { ok: true, value: node }
  }

  ls(path: string, cwd: string): VFSOutcome<VFSNode[]> {
    const res = this.resolve(path, cwd)
    if (!res.ok) return res
    if (res.value.kind === 'file') return { ok: true, value: [res.value] }
    return { ok: true, value: Object.values(res.value.children) }
  }

  cat(path: string, cwd: string): VFSOutcome<string> {
    const res = this.resolve(path, cwd)
    if (!res.ok) return res
    if (res.value.kind !== 'file') {
      return { ok: false, error: `${path}: is a directory` }
    }
    const content =
      typeof res.value.content === 'function'
        ? res.value.content()
        : res.value.content
    return { ok: true, value: content }
  }

  cd(path: string, cwd: string): VFSOutcome<string> {
    const abs = this.absolutize(path, cwd)
    const res = this.resolve(abs, cwd)
    if (!res.ok) return res
    if (res.value.kind !== 'dir') {
      return { ok: false, error: `not a directory: ${path}` }
    }
    return { ok: true, value: abs }
  }

  tree(path: string, cwd: string): VFSOutcome<string> {
    const res = this.resolve(path, cwd)
    if (!res.ok) return res
    const lines: string[] = [path === '.' ? cwd : path]
    this.buildTree(res.value, lines, '')
    return { ok: true, value: lines.join('\n') }
  }

  completions(partial: string, cwd: string): string[] {
    const lastSlash = partial.lastIndexOf('/')
    const dirPart = lastSlash >= 0 ? partial.slice(0, lastSlash + 1) : ''
    const filePart = lastSlash >= 0 ? partial.slice(lastSlash + 1) : partial

    const dirPath = dirPart || cwd
    const res = this.resolve(dirPath, cwd)
    if (!res.ok || res.value.kind !== 'dir') return []

    return Object.keys(res.value.children)
      .filter((k) => k.startsWith(filePart))
      .map((k) => {
        const child = (res.value as VFSDir).children[k]
        return dirPart + k + (child.kind === 'dir' ? '/' : '')
      })
  }

  private buildTree(node: VFSNode, lines: string[], prefix: string): void {
    if (node.kind !== 'dir') return
    const entries = Object.values(node.children)
    entries.forEach((child, i) => {
      const last = i === entries.length - 1
      const connector = last ? '└── ' : '├── '
      const extension = last ? '    ' : '│   '
      lines.push(prefix + connector + child.name + (child.kind === 'dir' ? '/' : ''))
      if (child.kind === 'dir') {
        this.buildTree(child, lines, prefix + extension)
      }
    })
  }

  absolutize(path: string, cwd: string): string {
    if (path === '~' || path === '') return '/'
    if (path.startsWith('~/')) path = '/' + path.slice(2)
    if (path.startsWith('/')) return this.normalize(path)
    return this.normalize(cwd + '/' + path)
  }

  private normalize(path: string): string {
    const parts = path.split('/').filter(Boolean)
    const resolved: string[] = []
    for (const p of parts) {
      if (p === '..') resolved.pop()
      else if (p !== '.') resolved.push(p)
    }
    return '/' + resolved.join('/')
  }

  private splitPath(path: string): string[] {
    return path.split('/').filter(Boolean)
  }
}
