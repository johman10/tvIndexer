class ErrorHandler {
  constructor(...contructorArguments) {
    this.arguments = contructorArguments;
  }

  static log (errorMessage) {
    if (!errorMessage) return;
    let error = ErrorHandler.generateError(errorMessage);
    console.log(error);
  }

  log (errorMessage) {
    ErrorHandler.log(errorMessage);
  }

  static throw (errorMessage) {
    if (!errorMessage) return;
    let error = ErrorHandler.generateError(errorMessage);
    throw error;
  }

  throw (errorMessage) {
    ErrorHandler.throw(errorMessage);
  }

  redirect (errorMessage) {
    if (!errorMessage) return;
    this.response = this.arguments[0];
    this.error = this.generateError(errorMessage);
    return this.response.status(500).render('errors/500', { error: this.error });
  }

  static generateError (errorMessage) {
    if (!errorMessage) return;

    if (errorMessage instanceof Error) {
      this.errorMessage = errorMessage;
      return this.errorMessage;
    }

    if (typeof errorMessage == 'object') {
      this.errorMessage = new Error(JSON.stringify(errorMessage));
    } else {
      this.errorMessage = new Error(errorMessage.toString());
    }

    return this.errorMessage;
  }

  generateError (errorMessage) {
    ErrorHandler.generateError(errorMessage);
  }
}

module.exports = ErrorHandler;
