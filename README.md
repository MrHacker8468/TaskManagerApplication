# Task Manager Application

This is a task management application built with **Next.js** and **MongoDB**. It allows users to manage tasks with full CRUD functionality.

## Prerequisites

Before running the project locally, make sure you have the following installed:

- **Node.js** (LTS version recommended)
- **MongoDB** (or use a MongoDB cloud instance, such as MongoDB Atlas)
- **Git** (optional, for cloning the repo)

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/MrHacker8468/task-manager.git
cd task-manager
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup MongoDB

**Option 1**: Use a local MongoDB instance
- Ensure MongoDB is installed and running on your machine
- Default connection URL: `mongodb://localhost:3000`

**Option 2**: Use MongoDB Atlas (cloud database)
- Create a MongoDB Atlas account
- Create a new cluster and obtain the connection string
- Replace the MongoDB connection URL in `.env` with your Atlas connection string

### 4. Configure environment variables

Create a `.env` file in the project root:

```bash
MONGODB_URI=<your_mongodb_connection_string>
```

### 5. Run the project

Start the development server:

```bash
npm run dev
```

The application will be running on `http://localhost:3000`

## Running Tests

### Run the test suite

```bash
npm run test
```

### Run tests for specific files or functions (optional)

```bash
npm run test -- <path_to_test_file_or_function>
```

## Folder Structure

```
/pages
    /addTask
        page.tsx
    /editTask
        [id]
            page.tsx
/test
    task.test.js (unit tests for backend)
/models
    task.js (Mongoose models)
/lib
    mongodb.js (MongoDB connection logic)
```

## Contributing

Feel free to fork the project, make changes, and submit a pull request.

## License

This project is licensed under the MIT License.