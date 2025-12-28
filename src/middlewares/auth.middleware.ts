import { Context, Next } from "hono"
import { JwtUtil } from "../utils/jwt.util";
import { UserRepository } from "../repository/user.repository";
import { RuntimeException, UnauthorizedException } from "../exceptions/exception";

const PUBLIC_ROUTES = ['/api/v1/auth/login', '/api/v1/users/create', '/api/v1/health', '/api/v1/learn']

export const authMiddleware = async (c: Context, next: Next) => {
    const path = c.req.path

    const checkPath = path.replace('/hono-service', '');
    if (PUBLIC_ROUTES.some(route => checkPath.startsWith(route))) {
        console.log("Got Public Path", path)
        return await next();
    }

    const authHeader = c.req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return c.json({ error: 'Missing or invalid Authorization header' }, 401);
    }

    const token = authHeader.split(' ')[1];

    try {
        const payload = await JwtUtil.verifyToken(token);
        const user = await UserRepository.getUserByEmail(payload.sub as string);
        if (!user) {
            throw new UnauthorizedException("User no longer exists")
        }
        c.set('user', user);
        c.set('jwtPayload', payload);
        await next();
    } catch (err: any) {
        throw new UnauthorizedException("Invalid or expired token")
    }
}