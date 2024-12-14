# TypeScript API Automation Framework

A robust and extensible TypeScript framework for API testing and automation. This framework provides features like request queuing, caching, error handling, and more to make API testing easier and more reliable.

## Features

- **Request Management**
  - Automatic request queuing with configurable concurrency
  - Response caching for GET requests
  - Configurable retry mechanism
- **Error Handling**
  - Custom error types (NetworkError, ValidationError)
  - Detailed error information including status codes and response data
- **Request Customization**
  - Support for custom headers and authentication
  - Request interceptors for modifying requests
- **Performance**
  - Efficient request queuing to prevent API overload
  - Configurable caching to reduce unnecessary requests

## Project Structure

```
ts-api-automation/
├── src/
│   ├── config/
│   │   └── apiConfig.ts       # API configuration (base URL, endpoints)
│   ├── services/
│   │   └── apiService.ts      # Main API service implementation
│   ├── utils/
│   │   ├── errors.ts          # Custom error classes
│   │   └── logger.ts          # Logging utility
│   ├── tests/
│   │   └── api.test.ts        # API tests
│   └── index.ts               # Main entry point
├── docs/
│   ├── README.md              # This documentation
│   └── USAGE.md              # Detailed usage guide
├── package.json
├── tsconfig.json
└── .gitignore
```

## Quick Start

1. Install the package:
```bash
npm install ts-api-automation
```

2. Import and use:
```typescript
import { ApiService } from 'ts-api-automation';

const api = new ApiService({
  baseUrl: 'https://api.example.com'
});

// Make API requests
const users = await api.get('/users');
const newUser = await api.post('/users', { 
  name: 'John Doe',
  email: 'john@example.com'
});
```

## Documentation

For detailed information about using this framework in your projects, please refer to our [Usage Guide](./docs/USAGE.md). The guide covers:

- Complete setup and configuration
- Making type-safe API requests
- Error handling strategies
- Authentication and interceptors
- Caching and request queuing
- Best practices and examples
- Service layer implementation

## Development

1. Clone the repository:
```bash
git clone https://github.com/Sharma-IT/ts-api-automation.git
cd ts-api-automation
```

2. Install dependencies:
```bash
npm install
```

3. Run tests:
```bash
npm test
```

4. Build the package:
```bash
npm run build
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the GNU v3.0 License - see the [LICENSE](LICENSE) file for details.
