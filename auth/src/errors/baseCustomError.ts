export abstract class BaseCustomError extends Error {
    abstract statusCode: number;
    constructor(message?: string) {
        super();
    }

    abstract getStatusCode(): number;
    abstract serializeErrorOutput(): any;
}
