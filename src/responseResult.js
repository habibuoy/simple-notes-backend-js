class ResponseResult {
  constructor(status, message = '', data = null) {
    this.status = status;
    this.message = message;
    this.data = data;
  }

  static succeed(message = '', data = null) {
    return new ResponseResult('success', message, data);
  }

  static fail(message) {
    return new ResponseResult('fail', message);
  }
}

module.exports = ResponseResult;