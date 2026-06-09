import { describe, it, expect } from 'vitest'
import { VirtualFS } from '@/lib/vfs/vfs'
import type { VFSDir } from '@/lib/vfs/types'

const tree: VFSDir = {
  kind: 'dir',
  name: '/',
  children: {
    'readme.txt': { kind: 'file', name: 'readme.txt', content: 'hello world' },
    projects: {
      kind: 'dir',
      name: 'projects',
      children: {
        'foo.txt': { kind: 'file', name: 'foo.txt', content: 'foo content' },
      },
    },
  },
}

const fs = new VirtualFS(tree)

describe('VirtualFS', () => {
  it('resolves root', () => {
    const r = fs.resolve('/', '/')
    expect(r.ok).toBe(true)
    if (r.ok) expect(r.value.kind).toBe('dir')
  })

  it('resolves a file', () => {
    const r = fs.resolve('/readme.txt', '/')
    expect(r.ok).toBe(true)
    if (r.ok) expect(r.value.name).toBe('readme.txt')
  })

  it('resolves nested file', () => {
    const r = fs.resolve('/projects/foo.txt', '/')
    expect(r.ok).toBe(true)
  })

  it('returns error for missing file', () => {
    const r = fs.resolve('/missing.txt', '/')
    expect(r.ok).toBe(false)
  })

  it('cat returns file content', () => {
    const r = fs.cat('readme.txt', '/')
    expect(r.ok).toBe(true)
    if (r.ok) expect(r.value).toBe('hello world')
  })

  it('cat errors on directory', () => {
    const r = fs.cat('projects', '/')
    expect(r.ok).toBe(false)
  })

  it('ls lists root children', () => {
    const r = fs.ls('/', '/')
    expect(r.ok).toBe(true)
    if (r.ok) expect(r.value.map((n) => n.name)).toContain('readme.txt')
  })

  it('cd changes to valid dir', () => {
    const r = fs.cd('projects', '/')
    expect(r.ok).toBe(true)
    if (r.ok) expect(r.value).toBe('/projects')
  })

  it('cd errors on file', () => {
    const r = fs.cd('readme.txt', '/')
    expect(r.ok).toBe(false)
  })

  it('absolutize handles ..', () => {
    expect(fs.absolutize('..', '/projects')).toBe('/')
  })

  it('absolutize handles ~', () => {
    expect(fs.absolutize('~', '/projects')).toBe('/')
  })

  it('tree returns ascii tree string', () => {
    const r = fs.tree('/', '/')
    expect(r.ok).toBe(true)
    if (r.ok) {
      expect(r.value).toContain('readme.txt')
      expect(r.value).toContain('projects/')
    }
  })

  it('completions returns matching paths', () => {
    const c = fs.completions('pro', '/')
    expect(c).toContain('projects/')
  })
})
