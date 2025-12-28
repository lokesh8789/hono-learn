import { createRouter, Env } from "../lib/create-router";
import { streamSSE } from 'hono/streaming';
import { upgradeWebSocket } from 'hono/bun';
import { Context } from "hono";

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

router.get("/ws", upgradeWebSocket((c: Context<Env>) => {
    return {
        onOpen(evt, ws) {
            console.log("WebSocket Connection Opened")
            console.log(evt)
            ws.send("Hi Buddy")
        },
        onClose(evt, ws) {
            console.log("WebSocket Connection Closed")
            console.log(evt)
        },
        onError(evt, ws) {
            console.log("Websocket Error Received")
            console.log(evt)
        },
        onMessage(evt, ws) {
            console.log("WebSocket Message Recevied")
            console.log(evt)
            ws.send(`Received: ${evt.data.toString()}`)
        },
    }
}))

let ws: WebSocket | null = null;

router.get("/ws-client", (c) => {
    if (ws && (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING)) {
        console.log("Using existing connection");
        ws.send("Triggered from route");
        return c.text("Existing connection used.");
    }

    ws = new WebSocket("ws://localhost:8000/hono-service/api/v1/learn/ws");

    ws.onopen = () => {
        console.log("New Connection Opened");
        ws?.send("I am Client");
    };

    ws.onmessage = (ev) => {
        console.log("Received:", ev.data);
    };

    ws.onclose = () => {
        console.log("Connection Closed");
        ws = null;
    };

    return c.text("New connection initiated.");
});

export { router as learnRouter }