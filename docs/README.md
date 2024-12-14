# TypeScript API Automation Framework

A modern, TypeScript-based API testing framework that provides a robust and type-safe solution for automating API testing. Built with modern ES modules and featuring advanced capabilities like request queuing, caching, and comprehensive error handling.

## Table of Contents

- [Features](#features)
- [Quick Start](#quick-start)
- [Documentation](#documentation)
- [Examples](#examples)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Modern TypeScript & ES Modules**: Built with TypeScript and modern ES module syntax
- **Type-Safe API Testing**: Full TypeScript support with interfaces for requests and responses
- **Request Management**:
  - Automatic request queuing with configurable concurrency
  - Response caching for GET requests
  - Retry mechanism with exponential backoff
- **Error Handling**:
  - Custom error types for network and validation errors
  - Detailed error information including status codes and response data
- **Developer Experience**:
  - Clean, promise-based API
  - Comprehensive logging for debugging
  - Easy to extend and customize

## Quick Start

1. Clone the repository:
   ```bash
   git clone https://github.com/Sharma-IT/ts-api-automation.git
   cd ts-api-automation
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the example tests:
   ```bash
   npm test
   ```

## Documentation

For detailed information about using this framework, please refer to our [Usage Guide](USAGE.md). The guide covers:

- Complete setup and configuration
- Making different types of API requests
- Error handling strategies
- Advanced features and best practices
- Example test suites

## Examples

Here's a quick example of how to use the framework:

```typescript
import { ApiService } from './services/apiService.js';
import { ENDPOINTS } from './config/apiConfig.js';

const apiService = new ApiService();

// Define your data types
interface User {
  id?: number;
  name: string;
  email: string;
}

async function testUserAPI() {
  try {
    // GET request
    const users = await apiService.get(ENDPOINTS.USERS);
    
    // POST request
    const newUser: User = {
      name: 'John Doe',
      email: 'john@example.com'
    };
    const created = await apiService.post(ENDPOINTS.USERS, newUser);
    
    // PUT request
    const updated = await apiService.put(`${ENDPOINTS.USERS}/${created.id}`, {
      name: 'John Updated'
    });
    
    // DELETE request
    await apiService.delete(`${ENDPOINTS.USERS}/${created.id}`);
    
  } catch (error) {
    console.error('Test failed:', error);
  }
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the GNU v3.0 License. See the [LICENSE](LICENSE) file for details.
