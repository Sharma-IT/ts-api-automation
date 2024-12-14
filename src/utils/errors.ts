export class NetworkError extends Error {
  status: number;
  data: any;

  constructor(status: number, data: any) {
    super(`${status} - ${JSON.stringify(data)}`);
    this.name = 'NetworkError';
    this.status = status;
    this.data = data;
  }
}

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}