# Expense Tracker ![Deployment](https://github.com/jekku123/expense-tracker/actions/workflows/deploy.yml/badge.svg)

This is a full-stack expense tracker application built to practise the MERN stack. It allows users to add, edit, and delete transactions and view a summary of their expenses.

Check out the live demo [here](http://13.48.129.24:5173/) (**Note**: Domain is not secured with SSL so persist login will not work at the moment.)

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

### Steps

1. Clone the repository

2. Run the following command to start the application:

```shell
./setup.sh
```
