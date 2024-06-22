# Employment Management System (EMS)

## Introduction

Welcome to the Employment Management System (EMS). This system is designed to manage employee information efficiently and effectively. It consists of a backend API built with NestJS and MongoDB and a frontend application built with Vite, TypeScript, Chakra UI, and Tailwind CSS.

## Technologies Used

### Backend
- ![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=flat&logo=nestjs&logoColor=white) NestJS: A progressive Node.js framework for building efficient and scalable server-side applications.
- ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white) MongoDB: A NoSQL database used to store employee information.
- ![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=flat&logo=swagger&logoColor=black) Swagger: Used for API documentation and testing.
- ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white) TypeScript: For type safety and enhanced development experience.
- ![Jest](https://img.shields.io/badge/Jest-C21325?style=flat&logo=jest&logoColor=white) Jest: Used for unit testing.
- ![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-2088FF?style=flat&logo=github-actions&logoColor=white) GitHub Actions: Used for CI/CD workflows.
- ![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=flat&logo=eslint&logoColor=white) ESLint: Used for linting the codebase.

### Frontend
- ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white) Vite: A build tool that aims to provide a faster and leaner development experience.
- ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white) TypeScript: For type safety and enhanced development experience.
- ![Chakra UI](https://img.shields.io/badge/Chakra--UI-319795?style=flat&logo=chakra-ui&logoColor=white) Chakra UI: A simple, modular, and accessible component library.
- ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white) Tailwind CSS: A utility-first CSS framework for rapid UI development.
- ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat&logo=axios&logoColor=white) Axios: A promise-based HTTP client for making API requests.
- ![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-2088FF?style=flat&logo=github-actions&logoColor=white) GitHub Actions: Used for CI workflows.

## Installation and Setup

### Backend

1. **Clone the repository**
    ```bash
    git clone https://github.com/DFanso/beta-launch-technical-assignment.git
    cd beta-launch-technical-assignment/backend
    ```

2. **Install dependencies**
    ```bash
    yarn install
    ```

3. **Set up environment variables**
    Create a `.env` file in the `backend` directory with the following content:
    ```env
    MONGO_URI=<your-mongodb-connection-string>
    ```

4. **Run the application**
    ```bash
    yarn dev
    ```
    The backend server will start on port 5000.

### Frontend

1. **Navigate to the frontend directory**
    ```bash
    cd beta-launch-technical-assignment/frontend
    ```

2. **Install dependencies**
    ```bash
    yarn install
    ```

3. **Set up environment variables**
    Create a `.env` file in the `frontend` directory with the following content:
    ```env
    VITE_API_URL=http://localhost:5000
    ```

4. **Run the application**
    ```bash
    yarn dev
    ```
    The frontend application will start on port 5173.

## API Documentation

API documentation is available and accessible through Swagger.

### Accessing the API Documentation

1. **Basic Authentication**
    The API documentation is protected using basic authentication. Use the following credentials:
    - **Username**: `admin`
    - **Password**: `admin`

2. **Access the documentation**
    Open your browser and navigate to:
    ```plaintext
    http://localhost:5000/documentation
    ```

## How to Run

1. **Ensure MongoDB is running**.
2. **Start the backend server**:
    ```bash
    yarn dev
    ```
3. **Start the frontend application**:
    ```bash
    yarn dev
    ```

## Testing and Linting

### Backend

1. **Run unit tests**
    ```bash
    yarn test
    ```

2. **Run linting**
    ```bash
    yarn lint
    ```

### CI with GitHub Actions

This project uses GitHub Actions for continuous integration. The workflows are defined in the `.github/workflows` directory. The following tasks are automated:
- Running unit tests.
- Running linting checks.

