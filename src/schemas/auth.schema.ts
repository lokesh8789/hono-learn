interface LoginRequest {
    email: string,
    password: string
}

interface AuthResponse {
    user: UserResponseSchema,
    token: string
}