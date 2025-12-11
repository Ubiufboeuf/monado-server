/* eslint-disable @typescript-eslint/no-explicit-any */

// FS es por File System.
// Es para diferenciarlas de las rutas / endpoints del servidor
export class FsRoute extends String {
  fullPath: string

  constructor (value?: any) {
    super(value)
    this.fullPath = ''
  }
}
