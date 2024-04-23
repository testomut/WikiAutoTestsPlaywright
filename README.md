# WikiAutoTestsPlaywright

This repository contains automated test scripts for testing Wikipedia using Playwright. It aims to ensure that various functionalities of Wikipedia, such as user authentication, article manipulation, and interface interaction, perform as expected.

## Prerequisites

Before you begin, ensure you have Node.js installed (preferably the latest LTS version).

## Installation

To set up this project locally, follow the instructions below:

```bash
# Clone the repository
git clone https://github.com/testomut/WikiAutoTestsPlaywright.git

# Navigate to the project directory
cd WikiAutoTestsPlaywright

# Install dependencies
npm install

# Run tests
npx playwright test
```
## Technology Stack

This project utilizes a number of powerful technologies and tools to ensure high-quality testing and automation:

- **Playwright**: Utilizes this Node library to automate actions in Chromium, Firefox, and WebKit with a single API. Playwright is built to enable cross-browser web automation that is ever-green, capable, reliable, and fast.
- **Node.js**: Provides the runtime environment in which the project's JavaScript code is executed. Node.js is crucial for using npm packages and running JavaScript on the server-side.
- **TypeScript**: Enhances JavaScript by adding static types. TypeScript is used for writing clearer, error-checked code and is transpiled to JavaScript that can be executed by the Node environment.
- **Jest**: Although not previously mentioned, if Jest is used, it provides a framework for all automated test cases, offering features like test organization, async testing, and mock services.
- **Postman and Swagger**: These tools are used for API testing and documentation. Postman allows for easy sending of REST requests and automated tests for APIs, while Swagger facilitates API design and interactive documentation.
- **Playwright Test**: This is Playwright's test runner, which is configured to run tests written with Playwright API in a reliable and efficient manner.

## Configuration

Here's a brief guide on how the project is configured:

- **playwright.config.ts**: This file contains all Playwright-specific configurations, including test runner options, browser options, and hooks for setting up and tearing down the testing environment.

## Dependencies

To manage project dependencies, the following steps are typical:

1. **Package Installation**: Run `npm install` to fetch all necessary packages as defined in `package.json`.
2. **Updating Dependencies**: To update dependencies, use `npm update` to retrieve the latest versions that match the version ranges specified in the `package.json`.

## Running Tests

To execute tests, use the following command:

```bash
npx playwright test
```
This command runs the entire test suite defined in the Playwright configuration. For more targeted tests, Playwright supports running specific test files or suites, which can be specified via command line arguments.

### Running Specific Tests

To run a specific test file, you can use the command:

```bash
npx playwright test path/to/test-file.ts
```
