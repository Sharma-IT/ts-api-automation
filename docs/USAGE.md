# TypeScript API Testing Client Usage Guide

This document provides a comprehensive guide on how to use the TypeScript API Automation Framework for testing your own API endpoints.

## Table of Contents
- [Installation](#installation)
- [Basic Setup](#basic-setup)
- [Configuration](#configuration)
- [Making API Requests](#making-api-requests)
- [Error Handling](#error-handling)
- [Advanced Features](#advanced-features)
- [Best Practices](#best-practices)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Sharma-IT/ts-api-automation.git
cd ts-api-automation
```

2. Install dependencies:
```bash
npm install
```

## Basic Setup

1. Configure your API endpoints in `src/config/apiConfig.ts`:
```typescript
export const API_BASE_URL = 'https://your-api-domain.com/api';

export const ENDPOINTS = {
  USERS: 'users',
  POSTS: 'posts',
  // Add your endpoints here
} as const;
```

2. Create your first test file:
```typescript
import { ApiService } from '../services/apiService.js';
import { ENDPOINTS } from '../config/apiConfig.js';

const apiService = new ApiService();

async function testApi() {
  try {
    const response = await apiService.get(ENDPOINTS.USERS);
    console.log('Response:', response);
  } catch (error) {
    console.error('Test failed:', error);
  }
}

testApi();
```

## Configuration

### API Service Configuration

The `ApiService` class supports several configuration options:

```typescript
const apiService = new ApiService({
  baseUrl: 'https://your-api.com', // Optional, defaults to API_BASE_URL
  retries: 3,                      // Number of retry attempts
  backoff: 300,                    // Backoff time in ms between retries
  cacheTime: 600                   // Cache duration in seconds
});
```

### Authentication

Add authentication tokens:
```typescript
apiService.setAuthToken('your-auth-token');
```

### Request Interceptors

Add custom request interceptors:
```typescript
apiService.addInterceptor((options: RequestInit) => {
  // Modify request options
  return {
    ...options,
    headers: {
      ...options.headers,
      'Custom-Header': 'value'
    }
  };
});
```

## Making API Requests

### GET Requests
```typescript
// Simple GET
const users = await apiService.get('users');

// GET with query parameters
const user = await apiService.get(`users/${userId}`);
```

### POST Requests
```typescript
const newUser = {
  name: 'John Doe',
  email: 'john@example.com'
};
const response = await apiService.post('users', newUser);
```

### PUT Requests
```typescript
const updatedUser = {
  name: 'John Updated'
};
const response = await apiService.put(`users/${userId}`, updatedUser);
```

### DELETE Requests
```typescript
const response = await apiService.delete(`users/${userId}`);
```

## Error Handling

The client provides two types of errors:

### NetworkError
```typescript
try {
  await apiService.get('nonexistent-endpoint');
} catch (error) {
  if (error instanceof NetworkError) {
    console.log('Status:', error.status);
    console.log('Error Data:', error.data);
  }
}
```

### ValidationError
```typescript
try {
  await apiService.post('users', invalidData);
} catch (error) {
  if (error instanceof ValidationError) {
    console.log('Validation Error:', error.message);
  }
}
```

## Advanced Features

### Request Queue
The client uses a queue system to manage concurrent requests:
```typescript
// Configure queue concurrency
const apiService = new ApiService({
  queueConcurrency: 5 // Maximum concurrent requests
});
```

### Caching
GET requests are automatically cached:
```typescript
// Cached response will be returned if available
const cachedResponse = await apiService.get('frequently-accessed-endpoint');
```

### Retry Mechanism
Failed requests are automatically retried with exponential backoff:
```typescript
// Configure retry behavior
const apiService = new ApiService({
  retries: 5,
  backoff: 500 // 500ms initial backoff
});
```

## Best Practices

1. **Organise Tests**
   - Group related tests in separate files
   - Use descriptive test names
   - Handle errors appropriately

2. **Type Safety**
   - Define interfaces for your API responses
   - Use TypeScript's type system to catch errors early

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

// Type-safe request
const user: User = await apiService.get(`users/${userId}`);
```

3. **Environment Configuration**
   - Use environment variables for sensitive data
   - Create separate configurations for different environments

4. **Error Handling**
   - Always wrap API calls in try-catch blocks
   - Log errors appropriately
   - Handle different types of errors differently

5. **Testing**
   - Write tests for both success and failure cases
   - Test edge cases and error scenarios
   - Use meaningful test data

## Example Test Suite

Here's a complete example of a test suite:

```typescript
import { ApiService } from '../services/apiService.js';
import { NetworkError, ValidationError } from '../utils/errors.js';
import { ENDPOINTS } from '../config/apiConfig.js';

interface User {
  id?: number;
  name: string;
  email: string;
}

async function testUserAPI() {
  const apiService = new ApiService();

  try {
    // Test GET users
    const users = await apiService.get(ENDPOINTS.USERS);
    console.log('Users:', users);

    // Test POST user
    const newUser: User = {
      name: 'Test User',
      email: 'test@example.com'
    };
    const createdUser = await apiService.post(ENDPOINTS.USERS, newUser);
    console.log('Created User:', createdUser);

    // Test PUT user
    const updatedUser = await apiService.put(
      `${ENDPOINTS.USERS}/${createdUser.id}`,
      { name: 'Updated Name' }
    );
    console.log('Updated User:', updatedUser);

    // Test DELETE user
    await apiService.delete(`${ENDPOINTS.USERS}/${createdUser.id}`);
    console.log('User deleted successfully');

  } catch (error) {
    if (error instanceof NetworkError) {
      console.error('Network Error:', error.status, error.data);
    } else if (error instanceof ValidationError) {
      console.error('Validation Error:', error.message);
    } else {
      console.error('Unknown Error:', error);
    }
  }
}

testUserAPI();
```

This guide should help you get started with using the API testing client for your own API endpoints. If you need any clarification or have specific use cases not covered here, please refer to the source code or create an issue in the repository.

# Using ts-api-automation in Your Project

This guide explains how to integrate and use the ts-api-automation framework in your TypeScript project.

## Installation

1. Install the package using npm:
```bash
npm install ts-api-automation
```

2. Make sure your `tsconfig.json` includes these compiler options:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ES2020",
    "moduleResolution": "node",
    "esModuleInterop": true
  }
}
```

## Basic Setup

1. Import the necessary components:
```typescript
import { 
  ApiService, 
  NetworkError, 
  ValidationError 
} from 'ts-api-automation';
```

2. Create an API service instance:
```typescript
const api = new ApiService({
  baseUrl: 'https://your-api.com',
  timeout: 5000
});
```

## Making API Requests

### GET Requests
```typescript
// Simple GET
const response = await api.get('/users');

// GET with query parameters
const user = await api.get(`/users/${userId}`);

// GET with type safety
interface User {
  id: number;
  name: string;
  email: string;
}

const typedResponse = await api.get<User>('/users/1');
console.log(typedResponse.data.name); // TypeScript knows this is a string
```

### POST Requests
```typescript
// Simple POST
const newUser = await api.post('/users', {
  name: 'John Doe',
  email: 'john@example.com'
});

// POST with type checking
interface CreateUserRequest {
  name: string;
  email: string;
}

interface CreateUserResponse {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}

const user = await api.post<CreateUserResponse, CreateUserRequest>(
  '/users',
  {
    name: 'John Doe',
    email: 'john@example.com'
  }
);
```

### PUT/PATCH Requests
```typescript
// PUT request
const updated = await api.put(`/users/${userId}`, {
  name: 'John Updated'
});

// PATCH request
const patched = await api.patch(`/users/${userId}`, {
  status: 'active'
});
```

### DELETE Requests
```typescript
await api.delete(`/users/${userId}`);
```

## Advanced Usage

### Configuration Options

```typescript
import { ApiService, ApiServiceConfig } from 'ts-api-automation';

const config: ApiServiceConfig = {
  // Base URL for all requests
  baseUrl: 'https://api.example.com',
  
  // Request timeout in milliseconds
  timeout: 5000,
  
  // Number of retry attempts for failed requests
  retries: 3,
  
  // Default headers for all requests
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  
  // Cache configuration
  cache: {
    stdTTL: 300,     // Time to live in seconds
    maxKeys: 100,    // Maximum number of cached items
    checkperiod: 60  // Cache cleanup interval in seconds
  },
  
  // Maximum number of concurrent requests
  queueConcurrency: 3
};

const api = new ApiService(config);
```

### Authentication

```typescript
// Set authentication token
api.setAuthToken('your-auth-token');

// The token will be automatically included in all subsequent requests
const protectedData = await api.get('/protected-endpoint');
```

### Request Interceptors

```typescript
// Add a request interceptor
api.addInterceptor((config) => {
  // Add custom headers
  config.headers['X-Custom-Header'] = 'value';
  
  // Add query parameters
  const url = new URL(config.url);
  url.searchParams.append('version', '1.0');
  config.url = url.toString();
  
  return config;
});
```

### Error Handling

```typescript
try {
  const response = await api.post('/users', invalidData);
} catch (error) {
  if (error instanceof NetworkError) {
    // Handle network errors (4xx, 5xx responses)
    console.error('Network Error:', error.status);
    console.error('Error Data:', error.data);
  } else if (error instanceof ValidationError) {
    // Handle validation errors
    console.error('Validation Error:', error.message);
  } else {
    // Handle other errors
    console.error('Unknown Error:', error);
  }
}
```

### Caching

The framework automatically caches GET requests. You can control caching behavior through configuration:

```typescript
const api = new ApiService({
  cache: {
    stdTTL: 300,     // Cache for 5 minutes
    maxKeys: 100,    // Store max 100 responses
    checkperiod: 60  // Clean up every minute
  }
});

// First request will hit the API
const response1 = await api.get('/users');

// Second request within 5 minutes will return cached data
const response2 = await api.get('/users');
```

### Request Queuing

The framework automatically queues requests to prevent overwhelming the API:

```typescript
const api = new ApiService({
  queueConcurrency: 3 // Only 3 concurrent requests allowed
});

// These requests will be automatically queued
const promises = Array.from({ length: 10 }, () => 
  api.get('/users')
);

// Requests will be executed 3 at a time
const responses = await Promise.all(promises);
```

## Best Practices

1. **Use TypeScript Interfaces**
```typescript
// Define your API interfaces
interface User {
  id: number;
  name: string;
  email: string;
}

// Use them in your requests
const users = await api.get<User[]>('/users');
const user = await api.post<User>('/users', { name: 'John', email: 'john@example.com' });
```

2. **Centralize API Configuration**
```typescript
// config/api.config.ts
export const apiConfig: ApiServiceConfig = {
  baseUrl: process.env.API_URL || 'https://api.example.com',
  timeout: 5000,
  retries: 3
};

// Use throughout your application
const api = new ApiService(apiConfig);
```

3. **Handle Errors Appropriately**
```typescript
async function fetchUsers() {
  try {
    const users = await api.get('/users');
    return users;
  } catch (error) {
    if (error instanceof NetworkError && error.status === 404) {
      return []; // Return empty array for not found
    }
    throw error; // Re-throw other errors
  }
}
```

4. **Use Environment Variables**
```typescript
const api = new ApiService({
  baseUrl: process.env.API_URL,
  timeout: parseInt(process.env.API_TIMEOUT || '5000'),
  headers: {
    'Authorization': `Bearer ${process.env.API_TOKEN}`
  }
});
```

## Examples

### Complete API Client Example
```typescript
// api/client.ts
import { ApiService, ApiServiceConfig } from 'ts-api-automation';

const config: ApiServiceConfig = {
  baseUrl: process.env.API_URL,
  timeout: 5000,
  retries: 3,
  headers: {
    'Content-Type': 'application/json'
  },
  cache: {
    stdTTL: 300,
    maxKeys: 100
  },
  queueConcurrency: 3
};

export const apiClient = new ApiService(config);

// Add global error handling
apiClient.addInterceptor((config) => {
  // Add timestamp to all requests
  const url = new URL(config.url);
  url.searchParams.append('_t', Date.now().toString());
  config.url = url.toString();
  return config;
});

// Export for use in your application
export default apiClient;
```

### Using the API Client
```typescript
// services/users.service.ts
import apiClient from '../api/client';

interface User {
  id: number;
  name: string;
  email: string;
}

export class UsersService {
  async getUsers(): Promise<User[]> {
    try {
      const response = await apiClient.get<User[]>('/users');
      return response.data;
    } catch (error) {
      // Handle errors appropriately
      console.error('Failed to fetch users:', error);
      throw error;
    }
  }

  async createUser(userData: Omit<User, 'id'>): Promise<User> {
    try {
      const response = await apiClient.post<User>('/users', userData);
      return response.data;
    } catch (error) {
      console.error('Failed to create user:', error);
      throw error;
    }
  }
}

export const usersService = new UsersService();
```

This documentation should help you integrate and use ts-api-automation effectively in your projects. If you have any further questions or need more guidance, please don't hesitate to [create an issue](https://github.com/Sharma-IT/ts-api-automation/issues).
