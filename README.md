# Expense Tracker ![Deployment](https://github.com/jekku123/expense-tracker/actions/workflows/deploy.yml/badge.svg)

This is a full-stack expense tracker application built to practise the MERN stack. It allows users to add, edit, and delete transactions and view a summary of their expenses.

## Technologies

- TypeScript
- Node.js
- Express
- MongoDB
- React.js
- Redux Toolkit
- Zod
- Shadcn UI
- Docker
- Nginx
- GitHub Actions
- AWS EC2

## Features

### Backend

- MSC (Model, Service, Controller) architecture
- Inversify for dependency injection
- Authentication using JWT and HTTP-only cookies with Refresh Token
- CRUD operations for transactions
- Error handling middleware
- Logger service for errors and logs using Winston
- MongoDB with Mongoose

### Frontend

- State management using Redux Toolkit
- Persist login option
- Add, edit, and delete transactions
- List of transactions
- Summary of expenses
- Responsive design using Shadcn UI
- Form validation using React Hook Form and Zod

## Installation

### Prerequisites

- Docker
- Docker Compose
- MongoDB URI

### Steps

1. Clone the repository
2. Create a `.env` file in the root directory and add the following environment variables:

```bash
MONGO_URI="your_mongo_uri"
ACCESS_TOKEN_SECRET="your-secret"
REFRESH_TOKEN_SECRET="your-secret"
VITE_SERVER_URL="http://localhost:4000"
```

3. Run the following command to start the application:

```shell
make up
```

4. Open `http://localhost:5173` in your browser

- To stop the application, run:

```shell
make down
```
