class ErrorHandler {
  constructor(reject, errorMessage) {
    this.rejectFunction = reject;
    this.errorMessage = errorMessage;
    this.error = new Error(this.errorMessage);
    return this.run();
  }

  run() {
    // TDOO: actually handle these errors;
    if (this.rejectionFunction) {
      this.rejectFunction(this.error);
    } else {
      console.log(this.error);
    }
  }
}

module.exports = ErrorHandler;
