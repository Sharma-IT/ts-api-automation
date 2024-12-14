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
