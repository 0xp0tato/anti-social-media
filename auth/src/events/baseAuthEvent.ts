export abstract class BaseAuthEvent<T = unknown> {
    protected abstract statusCode: number;
    abstract getStatusCode(): number;
    abstract serializeRest(): T;
}
