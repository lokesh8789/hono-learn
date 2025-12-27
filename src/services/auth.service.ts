import { UserRepository } from "../repository/user.repository";
import { HashUtil } from "../utils/hashing.util";
import { JwtUtil } from "../utils/jwt.util";

export const AuthService = {
    async login(req: LoginRequest): Promise<AuthResponse> {
        const user = await UserRepository.getUserByEmail(req.email)
        if (!user) {
            throw Error(`User with email: ${req.email} does not exist`)
        }
        const matched = await HashUtil.verify(user.password, req.password)
        if (!matched) {
            throw Error(`Password For email: ${req.email} does not match`)
        }
        const token = await JwtUtil.generateToken({ email: user.email, userId: user.id })
        return {
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name
            }
        };
    }
}