export class APIResponse<T> {
  APIResponse() {}
  public isSuccess: boolean;
  public isFailed: boolean;
  public pageNumber: number;
  public reasons: Array<string> = [];
  public errors: Array<string> = [];
  public successes: Array<string> = [];
  public valueOrDefault: T;
  public value: T;
}
