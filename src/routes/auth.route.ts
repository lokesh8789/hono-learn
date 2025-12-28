import { createRouter } from "../lib/create-router";
import { AuthService } from "../services/auth.service";

const router = createRouter()


router.post("/login", async (c) => {
    const data = await AuthService.login(await c.req.json())
    return c.json({ success: true, data })
})



export { router as authRouter }