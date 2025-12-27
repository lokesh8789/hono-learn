import { sign, verify } from 'hono/jwt'
import { JWTPayload } from 'hono/utils/jwt/types';

export const JwtUtil = {
    SECRET_KEY: "nslaivbaivnbhfbqlhagyvlaigirhgabjhgfligssgsygfydfgdskqbkaygkuagkuydcgvktafckavv5624tf54qaytvgyuwgfwl",

    async generateToken(data: { email: string, userId: number }) {
        const payload: JWTPayload = {
            sub: data.email,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 2, // 2 hours
            userId: data.userId
        }
        return sign(payload, this.SECRET_KEY, "HS512")
    },

    async verifyToken(token: string) {
        return await verify(token, this.SECRET_KEY, "HS512");
    }
}