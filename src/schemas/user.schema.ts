interface UserRequestSchema {
    email: string
    name: string,
    password: string
}

interface UserResponseSchema {
    id: number,
    name: string,
    email: string
}