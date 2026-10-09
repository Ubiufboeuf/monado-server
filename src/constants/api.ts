const env = import.meta.env

export const PORT = env.PORT ?? '7002'
export const ENV_ORIGINS = (env.ENV_ORIGINS ?? '').split(' ')
