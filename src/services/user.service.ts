import { ResourceNotFoundException, RuntimeException } from "../exceptions/exception";
import { UserRepository } from "../repository/user.repository"
import { HashUtil } from "../utils/hashing.util";

export const UserService = {
    async registerUser(data: UserRequestSchema): Promise<UserResponseSchema> {
        console.log("Recevied User", data)
        const existing = await UserRepository.getUserByEmail(data.email);
        if (existing) {
            throw new RuntimeException(409, "Email already in use");
        }

        const hashedPassword = await HashUtil.hash(data.password);
        const reqUser: Omit<User, 'id'> = {
            name: data.name,
            password: hashedPassword,
            email: data.email
        }
        const user = await UserRepository.saveUser(reqUser);
        return { id: user.id, name: user.name, email: user.email };
    },

    async listUsers(): Promise<UserResponseSchema[]> {
        console.log("Fetching All Users")
        const users = await UserRepository.getUsers();
        console.log("Users Size", users.length)

        return users.map(u => ({
            id: u.id,
            name: u.name,
            email: u.email,
        }));
    },

    async getByEmail(email: string): Promise<UserResponseSchema> {
        const user = await UserRepository.getUserByEmail(email);
        if (!user) throw new ResourceNotFoundException("User not found");
        return { id: user.id, name: user.name, email: user.email };
    },

    async removeUser(id: number): Promise<boolean> {
        const ok = await UserRepository.deleteUser(id);
        if (!ok) throw new ResourceNotFoundException("User not found");
        return true;
    },
}