import { SignJWT, jwtVerify } from "jose";

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

    static async newToken(name: string): Promise<string> {
        return await new SignJWT()
            .setProtectedHeader({ alg: "HS256" })
            .setIssuer("sudoku")
            .setSubject(name)
            .setIssuedAt()
            .sign(new TextEncoder().encode(process.env.TOKEN_JWT_SECRET as string));
    }
}

export type TokenPayLoad = {
    name: string;
}