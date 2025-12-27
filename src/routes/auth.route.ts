import { createRouter } from "../lib/create-router";
import { AuthService } from "../services/auth.service";

const router = createRouter()


router.post("/login", async (c) => {
    try {
        const data = await AuthService.login(await c.req.json())
        return c.json({ success: true, data })
    } catch (err: any) {
        return c.json({ success: false, title: "Authentication Failed", message: err.message }, 401)
    }
})



export { router as authRouter }