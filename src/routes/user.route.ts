import { Hono } from "hono";
import { UserService } from "../services/user.service";

const router = new Hono()

router.post("/create", async (c) => {
    const body = await c.req.json();
    try {
        const user = await UserService.registerUser(body);
        return c.json({ success: true, user }, 201);
    } catch (err: any) {
        return c.json({ success: false, error: err.message }, 400);
    }
});

router.get("/getAll", async (c) => {
    return c.json(await UserService.listUsers(), 200);
});

router.get("/getByEmail/:email", async (c) => {
    const email = c.req.param("email");
    try {
        const user = await UserService.getByEmail(email);
        return c.json({ success: true, user }, 200);
    } catch (err: any) {
        return c.json({ success: false, error: err.message }, 404);
    }
});

router.delete("/delete/:id", async (c) => {
    const id = Number(c.req.param("id"));
    try {
        await UserService.removeUser(id);
        return c.json({ success: true }, 200);
    } catch (err: any) {
        return c.json({ success: false, error: err.message }, 404);
    }
});

export { router as userRouter }