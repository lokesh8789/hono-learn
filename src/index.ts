import { Hono } from 'hono'
import { logger } from 'hono/logger'

const app = new Hono().basePath("/hono-service/api/v1")

interface User {
  id: number,
  name: string
}

interface UserResponse {
  id: number,
  name: string
}

app.use(logger())

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get("/path/:id?", (c) => {
  const id = c.req.param("id")
  return c.json({ "success": true, data: id, optional: id ? true : false })
})

app.get("/query", (c) => {
  return c.json({ "success": true, data: c.req.query("id") })
})

app.post("/post", async (c) => {
  const user = await c.req.json<User>()
  return c.json(user)
})

app.post("/post2", async (c) => {
  const { id, name } = await c.req.json<User>()
  return c.json({ id, name })
})

app.post("/post3", async (c) => {
  const user = await c.req.json<User>()
  const response: UserResponse = {
    id: user.id,
    name: user.name
  }
  return c.json(response)
})

app.delete("/delete/:id", (c) => {
  const id = Number(c.req.param('id'))
  return c.json({ deleted: id > 0 })
})

app.put("/put/:id", (c) => {
  const id = Number(c.req.param('id'))
  return c.json({ updated: id > 0 })
})

app.patch("/patch/:id", (c) => {
  const id = Number(c.req.param('id'))
  return c.json({ updated: id > 0 })
})

// Bun.serve({
//   port:8000,
//   fetch: app.fetch
// })

export default {
  port: 8000,
  fetch: app.fetch
}
