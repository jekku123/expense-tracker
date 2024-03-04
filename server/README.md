# Node.js Express MongoDB Clean Architecture example

This is a basic Node.js application template using Express.js for the server and MongoDB with Mongoose for data storage.

## Project Structure

The project follows an MVC (Model-View-Controller) architecture with the following structure:

- app/controllers: Contains Express.js controllers responsible for handling HTTP requests and coordinating interactions between clients and the application.

app/repositories: Implements the repository pattern and provides methods for interacting with the MongoDB database.

app/interactors: Acts as the business logic layer and encapsulates operations related to entities. It coordinates interactions between controllers and repositories, performing tasks such as validation, transformation, and coordination.

app/models: Defines Mongoose schemas for entities, specifying the structure of the data stored in the MongoDB database.

app/interfaces: Contains TypeScript interfaces defining contracts for repositories and interactors, specifying the methods that must be implemented by concrete classes.

server.ts: Configures the Express.js server, sets up routes, and initializes the application.
