import { API_BASE_URL } from '../config/apiConfig.js';
import { logger } from '../utils/logger.js';
import { NetworkError, ValidationError } from '../utils/errors.js';
import NodeCache from 'node-cache';
import PQueue from 'p-queue';

export interface ApiServiceConfig {
  baseUrl?: string;
  timeout?: number;
  retries?: number;
  headers?: Record<string, string>;
  cache?: {
    stdTTL?: number;
    maxKeys?: number;
    checkperiod?: number;
  };
  queueConcurrency?: number;
}

export class ApiService {
  private baseUrl: string;
  private authToken: string | null = null;
  private interceptors: ((options: RequestInit) => RequestInit)[] = [];
  private cache: NodeCache;
  private queue: PQueue;

  constructor(config: ApiServiceConfig = {}) {
    this.baseUrl = config.baseUrl || API_BASE_URL;
    this.cache = new NodeCache(config.cache || { stdTTL: 600 });
    this.queue = new PQueue({ concurrency: config.queueConcurrency || 5 });
  }

  setAuthToken(token: string) {
    this.authToken = token;
  }

  addInterceptor(interceptor: (options: RequestInit) => RequestInit) {
    this.interceptors.push(interceptor);
  }

  async request(method: string, endpoint: string, data?: any, retries = 3, backoff = 300) {
    return this.queue.add(async () => {
      const url = `${this.baseUrl}/${endpoint}`;
      const headers = {
        'Content-Type': 'application/json',
        ...(this.authToken && { Authorization: `Bearer ${this.authToken}` }),
      };

      let options: RequestInit = {
        method,
        headers,
        body: data ? JSON.stringify(data) : undefined,
      };

      for (const interceptor of this.interceptors) {
        options = interceptor(options);
      }

      logger.request(method, url, options);

      for (let i = 0; i < retries; i++) {
        try {
          const response = await fetch(url, options);
          
          // Handle non-200 responses
          if (!response.ok) {
            const errorData = await response.text();
            if (response.status === 400) {
              throw new ValidationError(errorData);
            } else {
              throw new NetworkError(response.status, errorData);
            }
          }

          // Handle empty responses (like 204 No Content)
          const contentLength = response.headers.get('content-length');
          const isEmptyResponse = contentLength === '0' || response.status === 204;
          
          const responseData = isEmptyResponse ? {} : await response.json();
          logger.response(method, url, response.status, responseData);
          return responseData;
        } catch (error: unknown) {
          if (error instanceof NetworkError && i < retries - 1) {
            logger.error(`${method} request to ${url} failed, retrying...`);
            await new Promise(resolve => setTimeout(resolve, backoff * (i + 1)));
          } else {
            if (error instanceof Error) {
              logger.error(`${method} request to ${url} failed: ${error.message}`);
            } else {
              logger.error(`${method} request to ${url} failed: Unknown error`);
            }
            throw error;
          }
        }
      }
    });
  }

  async get(endpoint: string) {
    const cachedResponse = this.cache.get(endpoint);
    if (cachedResponse) {
      logger.info(`Returning cached response for ${endpoint}`);
      return cachedResponse;
    }

    const response = await this.request('GET', endpoint);
    this.cache.set(endpoint, response);
    return response;
  }

  async post(endpoint: string, data: any) {
    return this.request('POST', endpoint, data);
  }

  async put(endpoint: string, data: any) {
    return this.request('PUT', endpoint, data);
  }

  async delete(endpoint: string) {
    return this.request('DELETE', endpoint);
  }
}