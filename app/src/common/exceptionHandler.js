"use strict";

class ErrorHandler extends Error {
  constructor (message) {
    super(message);
    this.params = {};
    this.status = 400;
    this.name = "BadRequest";
  }
}

class NotFoundError extends ErrorHandler {
  constructor (message, params) {
    super(message, params);
    this.name = "NotFoundError";
    this.status = 404;
    this.params = params;
  }
}

class UnauthorizedError extends ErrorHandler {
  constructor (message, params) {
    super(message);
    this.name = "UnauthorizedError";
    this.status = 401;
    this.params = params;
  }
}
class BadRequest extends ErrorHandler {
  constructor (message, params) {
    super(message, params);
    this.status = 400;
  }
}
module.exports = {
  errorCallback: async (msg, error) => {
    if (!error) error = {};
    msg = ` ${msg} : ${error.message ? error.message : ""}`;

    throw new Error(msg);
  },
  formatError: async (error) => {
    let typeError;
    if (error.name !== "Error") {
      typeError = error.name;
    } else {
      typeError = "BadRequest";
    }
    const status = error.status ? error.status : 400;
    const description = `${typeError} | ${error.message}`;
    const details = error.stack;
    const info = error.params ? error.params : {};

    return { description: description, status, info, details };
  },
  BadRequest,
  UnauthorizedError,
  NotFoundError
};
