import { Hono } from "hono";
import { UserService } from "../services/user.service";
import { createRouter } from "../lib/create-router";

const router = createRouter()

router.post("/create", async (c) => {
    const body = await c.req.json();
    const user = await UserService.registerUser(body);
    return c.json({ success: true, user }, 201);
});

router.get("/getAll", async (c) => {
    return c.json(await UserService.listUsers(), 200);
});

router.get("/getByEmail/:email", async (c) => {
    const email = c.req.param("email");
    console.log("logged in user: ", c.var.user)
    const user = await UserService.getByEmail(email);
    return c.json({ success: true, user }, 200);
});

router.delete("/delete/:id", async (c) => {
    const id = Number(c.req.param("id"));
    await UserService.removeUser(id);
    return c.json({ success: true }, 200);
});

export { router as userRouter }