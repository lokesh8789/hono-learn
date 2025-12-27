import sql from "../config/db.config"

export const UserRepository = {
    async saveUser(user: Omit<User, 'id'>) {
        const [created] = await sql<User[]>`INSERT INTO users (name, email, password) VALUES (${user.name}, ${user.email}, ${user.password}) RETURNING id, name, email, password`;
        return created
    },

    async getUsers() {
        return await sql<User[]>`SELECT id, name, email FROM users ORDER BY id DESC` as User[];
    },

    async deleteUser(id: number) {
        const result = await sql`DELETE FROM users WHERE id = ${id}`;
        return result.count > 0;
    },

    async getUser(id: number) {
        const [user] = await sql<User[]>`SELECT id, name, email, password FROM users WHERE id = ${id}`;
        return user ?? null;
    },

    async getUserByEmail(email: string) {
        const [user] = await sql<User[]>`SELECT id, name, email, password FROM users WHERE email = ${email}`;
        return user ?? null;
    }

}