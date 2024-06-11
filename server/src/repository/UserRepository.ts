import User from "../model/User";

export default class UserRepository {
    static async get(name: string): User | undefined {
        const user = await User.findOne({
            where: {
                name: name
            }
        });

        if (user === null)
            return undefined;

        return user as unknown as User;
    }

    static create(name: string, password: string): User | undefined {
        return undefined;
    }

    static update(name?: string, password?: string): User | undefined {
        return undefined;
    }

    static delete(name: string): boolean {
        return false;
    }
}

export type User = {
    name: string,
    password: string
}