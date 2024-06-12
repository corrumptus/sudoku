import { jwtVerify } from "jose";

export default class TokenService {
    static async validate(token: string): Promise<TokenPayLoad | undefined> {
        try {
            const name = (await jwtVerify(
                token,
                new TextEncoder().encode(process.env.TOKEN_JWT_SECRET as string),
                {
                    issuer: "sudoku",
                    maxTokenAge: "2 days",
                    clockTolerance: "1 day"
                }
            )).payload.sub;

            if (name === undefined)
                return undefined;

            return {
                name: name
            }
        } catch (e) {
            return undefined;
        }
    }

    static newToken(name: string): string {
        return "";
    }
}

export type TokenPayLoad = {
    name: string;
}