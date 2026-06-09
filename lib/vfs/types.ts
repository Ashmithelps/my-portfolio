export interface VFSFile {
  kind: 'file'
  name: string
  content: string | (() => string)
  description?: string
}

export interface VFSDir {
  kind: 'dir'
  name: string
  children: Record<string, VFSNode>
  description?: string
}

export type VFSNode = VFSFile | VFSDir

export interface VFSResult<T> {
  ok: true
  value: T
}

export interface VFSError {
  ok: false
  error: string
}

export type VFSOutcome<T> = VFSResult<T> | VFSError
