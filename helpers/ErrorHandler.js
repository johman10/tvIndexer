class ErrorHandler {
  constructor(...contructorArguments) {
    this.arguments = contructorArguments;
  }

  log(errorMessage) {
    if (!errorMessage) return;
    this.error = this.generateError(errorMessage);
    console.log(this.error);
  };

  throw(errorMessage) {
    if (!errorMessage) return;
    this.error = this.generateError(errorMessage);
    throw this.error;
  };

  redirect(errorMessage) {
    if (!errorMessage) return;
    this.response = this.arguments[0];
    this.error = this.generateError(errorMessage);
    return this.response.status(500).render('errors/500', { error: this.error });
  }

  generateError(errorMessage) {
    if (!errorMessage) return;
    this.errorMessage = errorMessage;
    if (this.errorMessage) {
      return new Error(this.errorMessage);
    } else {
      return new Error(this.errorType);
    }
  }
}

module.exports = ErrorHandler;
