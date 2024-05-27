export default class UserResponse {
    readonly token: string | undefined;
    readonly errorMessage: string | undefined;

    private constructor(token: string | undefined, errorMessage: string | undefined) {
        this.token = token;
        this.errorMessage = errorMessage;
    }

    static ofError(errorMessage: string): UserResponse {
        return new UserResponse(undefined, errorMessage);
    }

    static ofToken(token: string): UserResponse {
        return new UserResponse(token, undefined);
    }
}