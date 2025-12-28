import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { learnRouter } from './routes/learn.route'
import { userRouter } from './routes/user.route'
import { authRouter } from './routes/auth.route'
import { authMiddleware } from './middlewares/auth.middleware'
import { cors } from 'hono/cors'
import { websocket } from 'hono/bun'

const app = new Hono().basePath("/hono-service")

app.use(cors({
  origin: "*",
  allowHeaders: ["*"],
  allowMethods: ["*"],
}))
app.use(logger())
app.use(authMiddleware)

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route("/api/v1/learn", learnRouter)
app.route("/api/v1/auth", authRouter)
app.route("/api/v1/users", userRouter)

Bun.serve({
  port: 8000,
  fetch: app.fetch,
  websocket: {
    ...websocket,
    maxPayloadLength: 1024 * 1024 * 25,
  }
})

// export default {
//   port: 8000,
//   fetch: app.fetch,
//   websocket: websocket
// }
