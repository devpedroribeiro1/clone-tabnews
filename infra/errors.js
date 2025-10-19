export class InternalServerError extends Error {
  constructor({ cause }) {
    super("An unexpected error occurred.", {
      cause,
    });
    this.name = "InternalServerError";
    this.action = "Contact the support.";
    this.statusCode = 500;
  }

  toJson() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      statusCode: this.statusCode,
    };
  }
}
