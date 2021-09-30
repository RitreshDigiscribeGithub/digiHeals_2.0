export class BaseResponse<T> {
  status = false;
  error: string = "";
  errors: string[] = [];
  data: T;
  constructor() {}
  hasErrors() {
    return this.error || this.errors.length > 0;
  }
  getError() {
    return this.error ? this.error : this.errors;
  }
}
