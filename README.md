# TypeScript API Automation Framework

This TypeScript-based API automation framework provides a robust and extensible solution for automating API testing and interactions. It includes features such as authentication support, request interceptors, response caching, enhanced error handling, retry logic, request queuing, detailed logging, and more.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Authentication Support**: Handle API keys, tokens, or OAuth for secure API calls.
- **Request Interceptors**: Modify requests before they're sent, allowing for dynamic header additions or request transformations.
- **Response Caching**: Cache GET requests to improve performance and reduce unnecessary API calls.
- **Enhanced Error Handling**: Custom error classes for different types of API errors (e.g., NetworkError, ValidationError) to provide more detailed error information.
- **Retry Logic**: Retry failed requests with configurable attempts and backoff strategy.
- **Request Queuing**: Manage rate limiting and prevent overwhelming the API server with a queue system.
- **Detailed Logging**: Include detailed request and response information for better debugging.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ts-api-automation.git
   cd ts-api-automation
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Compile TypeScript:
   ```bash
   npx tsc
   ```

## Usage

Run the test suite:

```bash
npm test
```

## Contributing

Pull requests are welcomed. For major changes, please open an issue first to discuss what you would like to change.


## License

This project is licensed under the GNU v3.0 License. See the [LICENSE](LICENSE) file for details.
