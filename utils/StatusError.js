class StatusError extends Error {
  /**
   * Extends Error class to also accept a status code, allowing for
   * easier / simpler error handling without having to create the error,
   * manually add the status code, and then throw it.
   * @param {number} statusCode Error status code
   * @param {string} message Error message (gets passed on to base Error class)
   */
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = StatusError;
