import { ErrorHandler, Injectable } from "@angular/core";

@Injectable()
export class GlobarErrorHandlerService implements ErrorHandler {
  handleError(error: any): void {
    const chunkFailedMessage = /Loading chunk [\d]+ failed/;

    if (chunkFailedMessage.test(error.message)) {
      console.log("chunk load failed");

      window.location.reload();
    }
  }
}
