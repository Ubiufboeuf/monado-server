/* eslint-disable @typescript-eslint/no-unsafe-function-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-this-alias */

interface ThrottleOptions {
  initialTimeout?: number
  timeout?: number
}

// Esta función existe porque sleep() existe en bun, no en node
export const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms))

export function debounce<T extends Function> (fn: (this: T, ...args: any[]) => any, timeout: number): any {
  let timeoutId: NodeJS.Timeout | null = null

  return function (this: T, ...args: any[]) {
    const context = this
    
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      fn.apply(context, args)
    }, timeout)
  }
}

export async function throttle<F extends (this: any, ...args: any[]) => any> (fn: F, options: ThrottleOptions): Promise<F> {
  let inThrottle = false
  let lastResult: any
  const { initialTimeout, timeout = 400 } = options

  if (initialTimeout) await new Promise((res) => setTimeout(res, initialTimeout))

  return function (this: any, ...args: any[]) {
    const context = this

    if (!inThrottle) {
      lastResult = fn.apply(context, args)
      
      inThrottle = true

      setTimeout(() => {
        inThrottle = false
      }, timeout)
    }
    
    return lastResult
  } as F
}

export async function createThrottleCallback<ReturnType> (fn: () => ReturnType, options: ThrottleOptions) {
  let inThrottle = false
  let lastResult: ReturnType
  const { initialTimeout, timeout = 400 } = options

  if (initialTimeout) await new Promise((res) => setTimeout(res, initialTimeout))

  return function () {
    if (!inThrottle) {
      lastResult = fn()
      
      inThrottle = true

      setTimeout(() => {
        inThrottle = false
      }, timeout)
    }
    
    return lastResult
  }
}
