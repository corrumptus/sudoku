export default class TokenService {
    static validate(token: string): TokenPayLoad | undefined {
        return undefined;
    }

    static newToken(name: string): string {
        return "";
    }
}

export type TokenPayLoad = {

}