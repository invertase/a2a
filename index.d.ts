type Tuple<T1, T2> = [T1, T2];
type A2AResult<TResult, TError> = Tuple<TError|null, TResult|undefined>;

declare function a2a<TResult=any, TError = any>(promise: Promise<TResult>): Promise<A2AResult<TResult, TError>>;
declare function a2a<TResult=any, TError = any>(promise: Promise<TResult>[]): Promise<A2AResult<TResult[], TError>>;

export default a2a;
