import { AsyncLocalStorage } from 'node:async_hooks'

interface ServerContext {
  publicContent: Set<string>
}

export const serverContext = new AsyncLocalStorage<ServerContext>()
