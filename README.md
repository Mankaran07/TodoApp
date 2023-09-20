# Todo Website

A full-stack web application for managing todos. This project utilizes Express.js as the backend API server, React.js as the frontend framework, and Material-UI (MUI) for the UI components.

## Features

- Create new todos with a title and description.
- View a list of existing todos.
- Update and modify existing todos.
- Delete todos.

## Technologies Used

- Backend: Express.js
- Frontend: React.js, Material-UI (MUI)
- Database: Local JSON File
- Deployment: Render

## Online Deployed Site

The Todo Website is also deployed online and can be accessed at the following URL:

`https://todoapp-frontend-k3ut.onrender.com/`

Visit the deployed site to interact with the Todo App.

### Installation

1. Clone the repository: `git clone [repository-url]`
2. Install backend dependencies: `cd backend && npm install`
3. Install frontend dependencies: `cd frontend && npm install`

### Usage

1. Start the backend server: `cd backend && node todos.js`.
2. Start the frontend development server: `cd frontend && npm dev start`.
3. Access the application in your browser at `http://localhost:5173`.

## Technologies Used

- Express.js: A fast and minimalist web application framework for Node.js.
- ReactJS and MUI: Used for creating the frontend of the Todo App.

## API Routes

- `GET /todos:` Get all todos.
- `POST /todos:` Create a new todo.
- `DELETE /todos/:id:` Delete a todo with the specified ID.
- `PUT /todos/:id:` Update a todo with the specified ID.