import { Hono } from "hono";
import { HonoOptions } from "hono/hono-base";
import { JWTPayload } from "hono/utils/jwt/types";

export type Env = {
    Variables: {
        user: User;
        jwtPayload: JWTPayload;
    };
};

export const createRouter = (options?: HonoOptions<Env>) => new Hono<Env>(options)