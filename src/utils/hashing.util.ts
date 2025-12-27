export const HashUtil = {
    async hash(text: string): Promise<string> {
        const hash = await Bun.password.hash(text, {
            algorithm: "bcrypt",
            cost: 12
        })
        return hash
    },

    async verify(hashedText: string, plainText: string): Promise<boolean> {
        return await Bun.password.verify(plainText, hashedText, "bcrypt");
    }
}