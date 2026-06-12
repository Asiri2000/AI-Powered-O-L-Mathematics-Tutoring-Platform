# AI-Powered O-L Mathematics Tutoring Platform

## Overview
The AI-Powered O-L Mathematics Tutoring Platform is designed to provide personalized tutoring experiences using advanced AI technologies. This backend project is built with Node.js and Express, facilitating seamless communication between the client and server.

## Project Structure
The project is organized into several key directories and files:

- **src/**: Contains the main application code.
  - **app.js**: Initializes the Express application and sets up middleware.
  - **server.js**: Starts the server and listens on a specified port.
  - **config/**: Configuration files for database and environment settings.
  - **controllers/**: Contains the logic for handling requests related to authentication, users, questions, and tutors.
  - **models/**: Defines the data models for users, questions, and sessions.
  - **routes/**: Contains route definitions for the application.
  - **middleware/**: Includes middleware for authentication, error handling, and validation.
  - **services/**: Contains business logic for AI processing, math operations, and email notifications.
  - **utils/**: Utility functions for logging and other helper methods.

- **tests/**: Contains unit and integration tests to ensure the application functions correctly.

- **.env.example**: An example file for environment variables.

- **.gitignore**: Specifies files and directories to be ignored by Git.

- **package.json**: Configuration file for npm, listing dependencies and scripts.

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm (Node Package Manager)

### Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd BackEnd
   ```
3. Install the dependencies:
   ```
   npm install
   ```

### Configuration
1. Copy the `.env.example` file to `.env` and fill in the required environment variables.

### Running the Application
To start the server, run:
```
npm start
```
The server will listen on the specified port defined in the environment variables.

### Testing
To run the tests, use:
```
npm test
```

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.