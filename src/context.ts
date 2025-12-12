// import { AsyncLocalStorage } from 'node:async_hooks'

interface ServerContext {
  streamsFolder: Set<string>
  assetsFolder: Set<string>
  infoFolder: Set<string>
}

// export const serverContext = new AsyncLocalStorage<ServerContext>({ defaultValue: DefaultServerContext })
export const serverContext: ServerContext = {
  streamsFolder: new Set(),
  assetsFolder: new Set(),
  infoFolder: new Set()
}
