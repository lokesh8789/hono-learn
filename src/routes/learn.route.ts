import { createRouter } from "../lib/create-router";
import { streamSSE } from 'hono/streaming';

const router = createRouter()

interface LearnUser {
    id: number,
    name: string
}

interface LearnUserResponse {
    id: number,
    name: string
}

router.get("/path/:id?", (c) => {
    const id = c.req.param("id")
    return c.json({ "success": true, data: id, optional: id ? true : false })
})

router.get("/query", (c) => {
    return c.json({ "success": true, data: c.req.query("id") })
})

router.post("/post", async (c) => {
    const user = await c.req.json<LearnUser>()
    return c.json(user)
})

router.post("/post2", async (c) => {
    const { id, name } = await c.req.json<LearnUser>()
    return c.json({ id, name })
})

router.post("/post3", async (c) => {
    const user = await c.req.json<LearnUser>()
    const response: LearnUserResponse = {
        id: user.id,
        name: user.name
    }
    return c.json(response)
})

router.delete("/delete/:id", (c) => {
    const id = Number(c.req.param('id'))
    return c.json({ deleted: id > 0 })
})

router.put("/put/:id", (c) => {
    const id = Number(c.req.param('id'))
    return c.json({ updated: id > 0 })
})

router.patch("/patch/:id", (c) => {
    const id = Number(c.req.param('id'))
    return c.json({ updated: id > 0 })
})

router.get("/sse", (c) => {
    return streamSSE(c, async (stream) => {
        for (let i = 0; i < 10; i++) {
            await stream.writeSSE({ data: "Lokesh", id: i.toString() })
            await stream.sleep(1000)
        }
    })
})

export { router as learnRouter }