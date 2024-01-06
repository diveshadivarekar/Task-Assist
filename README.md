<br />
<div align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="public/assets/images/logo.svg" alt="Logo" height="100">
  </a>
  <h1 align="center">Task Assist</h1>
</div>

# Task Assist - Personal Planner and Organization Management System

Task Assist is a personal planner and organization management system built with Node.js. It helps users plan and organize their tasks efficiently.

## Built With

- Express js
- Bootstrap
- JQuery

## Features

- **Task Management:** Create, update, and delete tasks easily.
- **Expressive:** Utilizes the Express framework for a robust and scalable web application.
- **Middleware:** Incorporates body-parser and dotenv middleware for enhanced functionality.
- **Google APIs Integration:** Leverages the power of Google APIs for seamless integration with external services.

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/diveshadivarekar/Task-Assist.git
   ```

2. Navigate to the project directory:

   ```
   cd Task-Assist
   ```

3. Install dependencies:
   ```
   npm install
   ```

## Configuration

1. Create a .env file in the root directory.

2. Add the following environment variables:

   ```
   PORT=3000
   GOOGLE_API_KEY=your_google_api_key
   ```

Replace your_google_api_key with your actual Google API key.

## Usage

### Development

Run the following command to start the development server using nodemon:

    npm run dev

### Production

For production deployment, use the following command:

    npm start

## Endpoints

- **GET /task-data**: Get a list of all tasks.
- **GET /task-data/:fileId**: Get details of a specific task.
- **POST /add-task**: Create a new task.
- **GET /signinStatus**: Get the sign in status

## Dependencies

- [body-parser](https://www.npmjs.com/package/body-parser) - Parse incoming request bodies in a middleware before handlers.
- [dotenv](https://www.npmjs.com/package/dotenv) - Load environment variables from a .env file.
- [express](https://www.npmjs.com/package/express) - Fast, unopinionated, minimalist web framework for Node.js.
- [googleapis](https://www.npmjs.com/package/googleapis) - Google APIs Node.js client library.
- [nodemon](https://www.npmjs.com/package/nodemon) - Monitor for changes and automatically restart the server.

## Contributors

- [Divesh Adivarekar](https://github.com/diveshadivarekar)
- [Shashank Mahajan](https://github.com/shashankmahajan200)
- [Prathamesh Navale](https://github.com/navalepratham18)
- [Rudra Chintalwar](https://github.com/RudraChintalwar)

## License

This project is licensed under the MIT License - see the [LICENSE](/LICENSE) file for details.

## Acknowledgments

- Special thanks to the Node.js and Express communities.
- Inspiration from personal productivity tools.
<hr><br>
