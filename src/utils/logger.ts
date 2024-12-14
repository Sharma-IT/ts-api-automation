export const logger = {
  info: (message: string) => console.log(`[INFO] ${message}`),
  error: (message: string) => console.error(`[ERROR] ${message}`),
  request: (method: string, url: string, options: RequestInit) => {
    console.log(`[REQUEST] ${method} ${url}`);
    console.log('Headers:', options.headers);
    console.log('Body:', options.body);
  },
  response: (method: string, url: string, status: number, data: any) => {
    console.log(`[RESPONSE] ${method} ${url} - ${status}`);
    console.log('Data:', data);
  },
};