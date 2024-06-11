import { MD5 } from "crypto-js";
import User from "../model/User";

export default class UserRepository {
    static async get(name: string): UserDTO | undefined {
        const user = await User.findOne({
            where: {
                name: name
            }
        });

        if (user === null)
            return undefined;

        return user as unknown as UserDTO;
    }

    static async create(name: string, password: string): UserDTO | undefined {
        const newUser = User.build({
            name: name,
            password: MD5(password)
        });

        try {
            const savedUser = await newUser.save();

            if (savedUser === null)
                return undefined;

            return savedUser as unknown as UserDTO;
        } catch (e) {
            return undefined;
        }
    }

    static update(name?: string, password?: string): UserDTO | undefined {
        return undefined;
    }

    static delete(name: string): boolean {
        return false;
    }
}

export type UserDTO = {
    name: string,
    password: string
}