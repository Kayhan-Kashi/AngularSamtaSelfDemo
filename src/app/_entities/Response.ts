export class BaseResponse<T> {
  BaseResponse() {}

  public isSuccess: boolean;
  public isFailed: boolean;
  public pageNumber: number;
  public reasons: Array<string> = [];
  public errors: Array<string> = [];
  public successes: Array<string> = [];
  public valueOrDefault: ListItems<T>;
  value: ListItems<T>;
}

export class ListItems<T> extends Array<T> {
  public totalCount?: number;
  public items?: Array<T> = [];
}
