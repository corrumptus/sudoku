export default class UserRepository {
    static get(name: string): User | undefined {
        return undefined;
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