import { readFileSync } from 'node:fs'

export function createServerOptions () {
  let key, cert

  try {
    key = readFileSync('.cert/key.pem')
    cert = readFileSync('.cert/public.pem')
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
