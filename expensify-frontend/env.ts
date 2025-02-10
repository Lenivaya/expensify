import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  /*
   * Serverside Environment variables, not available on the client.
   * Will throw if you access these variables on the client.
   */
  server: {
    // biome-ignore lint/style/useNamingConvention: <explanation>
    NODE_ENV: z
      .enum(['development', 'production', 'test'])
      .default('development'),
    // biome-ignore lint/style/useNamingConvention: <explanation>
    API_URL: z
      .string()
      .url()
      .default('http://localhost:3000/api')
  },
  /*
   * Environment variables available on the client (and server).
   *
   * 💡 You'll get type errors if these are not prefixed with NEXT_PUBLIC_.
   */
  client: {
    // biome-ignore lint/style/useNamingConvention: <explanation>
    NEXT_PUBLIC_API_URL: z
      .string()
      .url()
      .default('http://localhost:3000/api')
  },
  /*
   * Due to how Next.js bundles environment variables on Edge and Client,
   * we need to manually destructure them to make sure all are included in bundle.
   *
   * 💡 You'll get type errors if not all variables from `server` & `client` are included here.
   */
  runtimeEnv: {
    // biome-ignore lint/style/useNamingConvention: <explanation>
    NODE_ENV: process.env.NODE_ENV,
    // biome-ignore lint/style/useNamingConvention: <explanation>
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    // biome-ignore lint/style/useNamingConvention: <explanation>
    API_URL: process.env.API_URL
  }
})
