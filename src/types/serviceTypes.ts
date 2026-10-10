export type GetResult <T> = {
  success: false
  error: string
} | {
  success: true
  data: T
}
