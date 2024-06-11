import { MD5 } from "crypto-js";
import User from "../model/User";

export default class UserRepository {
    static async get(name: string): Promise<UserDTO | undefined> {
        const user = await User.findOne({
            where: {
                name: name
            }
        });

        if (user === null)
            return undefined;

        return user as unknown as UserDTO;
    }

    static async create(name: string, password: string): Promise<UserDTO | undefined> {
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

    static async update(userName: string, name?: string, password?: string): Promise<UserDTO | undefined> {
        const user = await User.findOne({
            where: {
                name: userName
            }
        });

        if (user === null)
            return undefined;

        const newUserInfos: Partial<UserDTO> = {};

        if (name !== undefined)
            newUserInfos["name"] = name;

        if (password !== undefined)
            newUserInfos["password"] = password;

        user.set(newUserInfos);

        user.save();

        return user as unknown as UserDTO;
    }

    static async delete(name: string): Promise<boolean> {
        const user = await User.findOne({
            where: {
                name: name
            }
        });

        if (user === null)
            return false;

        await user.destroy();

        return true;
    }
}

export type UserDTO = {
    name: string,
    password: string
}