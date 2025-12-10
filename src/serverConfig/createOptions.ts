import { readFileSync } from 'node:fs'

export function createServerOptions () {
  let key, cert

  try {
    key = readFileSync('.cert/public.pem')
    cert = readFileSync('.cert/key.pem')
  } catch (err) {
    console.error('Error consiguiendo los certificados para https: ', err)
    return {}
  }

  console.log('HTTPS iniciado')
  
  return {
    key,
    cert
  }
}
