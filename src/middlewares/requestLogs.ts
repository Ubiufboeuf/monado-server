import morgan from 'morgan'
import pc from 'picocolors'

export const requestLogs = () => morgan(customLogsFormat)

const getColorByStatus = (status: number) => {
  if (status >= 500) return pc.red // Errores de servidor
  if (status >= 400) return pc.yellow // Errores de cliente
  if (status >= 300) return pc.blue // Redirecciones
  if (status >= 200) return pc.green // Éxito
  return pc.white
}

morgan.token('time_stamp', () => new Date().toTimeString().split(' ')[0])

const customLogsFormat: morgan.FormatFn = (tokens, req, res) => {
  const time = tokens['time_stamp']?.(req, res)
  const status = Number(tokens.status?.(req, res) ?? 0)
  const responseTime = tokens['response-time']?.(req, res)

  const coloredTime = pc.dim(time?.toString())
  const coloredStatus = getColorByStatus(status)(`[${status}]`)
  const coloredResponseTime = pc.dim(`${responseTime}ms`)

  return `${coloredTime} ${coloredStatus} / ${coloredResponseTime}`
}
