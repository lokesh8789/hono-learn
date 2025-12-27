import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { learnRouter } from './routes/learn.route'

const app = new Hono().basePath("/hono-service")

app.use(logger())

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route("/api/v1/learn", learnRouter)

// Bun.serve({
//   port:8000,
//   fetch: app.fetch
// })

export default {
  port: 8000,
  fetch: app.fetch
}
