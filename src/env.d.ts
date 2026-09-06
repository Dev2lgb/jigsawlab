/// <reference types="astro/client" />
// Cloudflare 바인딩: `import { env } from 'cloudflare:workers'`
declare namespace Cloudflare { interface Env { DB: D1Database; ASSETS: Fetcher; ROOMS: DurableObjectNamespace } }
