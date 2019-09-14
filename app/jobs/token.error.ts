import {HttpError} from 'routing-controllers';

export class UserError extends HttpError {
  operationName: string;
  args: any[];
  constructor(operationName: string, args: any[] = []) {
      super(401);
      Object.setPrototypeOf(this, UserError.prototype);
      this.operationName = operationName;
      this.args = args; // can be used for internal logging
  } 
  toJSON () :any {
    return {
      status: this.httpCode,
      failedOperation: this.operationName,
    }
  }
}
