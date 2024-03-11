# Expense Tracker Backend

This is the backend for the expense tracker app. It is built using Node.js, Express.js, and MongoDB.

## Structure

The backend is build using MSC (Model, Service, Controller) architecture. The `models` folder contains the schema for the MongoDB collections. The `services` folder contains the business logic for the application. The `controllers` folder contains the route handlers.

## Features

- Inversify for dependency injection
- Authentication using JWT
- CRUD operations for transactions
- Error handling middleware
- Logger service using Winston
