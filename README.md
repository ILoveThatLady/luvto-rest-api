# RESTful API for LuvTo Web App

This is a RESTful API for LuvTo Web App, for user registration and login, as well as task management for a simple task application.

Go to:

- [How to use it?](#How-to-use-it)
- [Endpoints](#Endpoints)

## How to use it?

Clone the repository

```bash
git clone https://github.com/ILoveThatLady/luvto-rest-api.git
cd luvto-rest-api
```

Install the dependencies

```bash
npm install
```

Run the server

```bash
node server/main.js
```

This will start the server en http://localhost:3000

## Connect to MongoDB

To connect to MongoDB you need to create an .env file in the root of the project.

.env file:

```javascript
MONGO_URI=<your-mongo-url>
JWT_SECRET=<your-jwt-secret>
```

## Endpoints

Go to:

- [Register](#register)
- [Login](#login)
- [Create a new task](#create-task)
- [Update a task](#update-task)
- [Get a list of tasks](#get-all-tasks)
- [Delete a task](#delete-task)

### **Register**

Register a new user with the credentials provided.

- **URL**

  `/register`

- **Method**

  `POST`

- **Request params**

  `none`

- **Request Body:**

```json
{
  "username": "example",
  "password": "password123",
  "email": "example@email.com"
}
```

- **Successful response**

  - Code: 201 (Created)
  - Response Body:

  ```json
  {
    "message": "user created"
  }
  ```

- **Error Response**
  - Code: 400 (Bad Request)
  - Response Body:
  ```json
  {
    "error": "User already exists"
  }
  ```
  - Code: 500 (Internal Server Error)
  - Response Body:
  ```json
  {
    "error": "Something went wrong"
  }
  ```

> Note: You can see an example usage in `examples/register.js`

### **Login**

Logs in a user with the provided credentials.

- **URL**

  `/login`

- **Method**

  `POST`

- **Request params**

  `none`

- **Request Body:**

```json
{
  "email": "example@example.com",
  "password": "password123"
}
```

- **Successful Response**
  - Code: 200 (OK)
  - Response Body:
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```
- **Error response**
  - Code: 401 (Unauthorized)
  - Response Body:
  ```json
  {
    "error": "Invalid username or password"
  }
  ```
  - Code: 500 (Internal Server Error)
  - Response Body:
  ```json
  {
    "error": "Something went wrong"
  }
  ```

> Note: You can see an example usage in `examples/login.js`

### **Create Task**

Creates a new task associated with the specified user.

- **URL**

  `/tasks/:userId`

- **Method**

  `POST`

- **URL Parameters**

  - `userId` - The ID of the user to associate the task with.

- **Headers**

  - `Authorization: Bearer <token>` - The access token obtained after logging in.

- **Request Body**

  - `title` (required): The title of the task.
  - `isCompleted`: Indicates whether the task is completed (default: `false`).
  - `description`: The description of the task.
  - `time`: The time associated with the task.
  - `date`: The date of the task.
  - `iisNotificationEnabled`: Indicates whether notifications are enabled for the task (default: `false`).
  - `repeatDays`: An array of days when the task is repeated.

- **Successful Response**

  - Code: 200 (OK)
  - Response Body:

  ```json
  {
    "message": "Task created",
    "task": {
      "_id": "task_id",
      "title": "Task Title",
      "isCompleted": false,
      "description": "Task Description",
      "time": "Task Time",
      "date": "Task Date",
      "isNotificationEnabled": false,
      "repeatDays": ["Monday", "Wednesday"],
      "user": "user_id",
      "createdAt": "2023-06-07T12:00:00Z",
      "updatedAt": "2023-06-07T12:00:00Z"
    }
  }
  ```

- **Error Response**
  - Code: 500 (Internal Server Error)
  - Response Body:
    ```json
    {
      "error": "Something went wrong"
    }
    ```

> Note: You can see an example usage in `examples/createTask.js`

### **Update Task**

Updates an existing task

- **URL**

  `/tasks/:taskId`

- **Method**

  `PUT`

- **URL Parameters**

  - `taskId` - The ID of the task to be updated.

- **Headers**

  - `Authorization: Bearer <token>` - The access token obtained after logging in.

- **Request Body**

  - `title` (required): The title of the task.
  - `isCompleted`: Indicates whether the task is completed (default: `false`).
  - `description`: The description of the task.
  - `time`: The time associated with the task.
  - `date`: The date of the task.
  - `iisNotificationEnabled`: Indicates whether notifications are enabled for the task (default: `false`).
  - `repeatDays`: An array of days when the task is repeated.

- **Successful Response**

  - Code: 200 (OK)
  - Response Body:

  ```json
  {
    "message": "Task updated",
    "task": {
      "_id": "task_id",
      "title": "Updated Task Title",
      "isCompleted": true,
      "description": "Updated Task Description",
      "time": "Updated Task Time",
      "date": "Updated Task Date",
      "isNotificationEnabled": true,
      "repeatDays": ["Monday", "Tuesday"],
      "user": "user_id",
      "createdAt": "2023-06-07T12:00:00Z",
      "updatedAt": "2023-06-07T12:30:00Z"
    }
  }
  ```

  - **Error Response**

    - Code: 404 (Not Found)
    - Response Body:

    ```json
    {
      "message": "Task not found"
    }
    ```

> Note: You can see an example usage in `examples/updateTask.js`

### **Get All Tasks**

Retrieves all the user's tasks

- **URL**

  `/tasks`

- **Method**

  `GET`

- **Headers**

  - `Authorization: Bearer <token>` - The access token obtained after logging in.

- **Successful Response**

  - Code: 200 (OK)
  - Response Body:

  ```json
  {
    "tasks": [
      {
        "_id": "task_id1",
        "title": "Task 1",
        "isCompleted": false,
        "description": "Task 1 description",
        "time": "09:00",
        "date": "2023-06-07",
        "isNotificationEnabled": true,
        "repeatDays": ["Monday", "Wednesday"],
        "user": "user_id",
        "createdAt": "2023-06-07T08:00:00Z",
        "updatedAt": "2023-06-07T09:30:00Z"
      },
      {
        "_id": "task_id2",
        "title": "Task 2",
        "isCompleted": true,
        "description": "Task 2 description",
        "time": "13:00",
        "date": "2023-06-08",
        "isNotificationEnabled": false,
        "repeatDays": [],
        "user": "user_id",
        "createdAt": "2023-06-07T10:00:00Z",
        "updatedAt": "2023-06-07T11:45:00Z"
      }
    ]
  }
  ```

- **Error Response**

  - Code: 500 (Internal Server Error)
  - Response Body:

  ```json
  {
    "error": "Something went wrong"
  }
  ```

> Note: You can see an example usage in `examples/getAllTasks.js`

### **Delete Task**

Delete a task.

- **URL**

  `/tasks/:taskId`

- **Method**

  `DELETE`

- **Headers**

  - `Authorization: Bearer <token>` - The access token obtained after logging in.

- **URL Parameters**

  - `taskId` - The ID of the task to delete.

- **Successful Response**

  - Code: 200 (OK)
  - Response Body:

  ```json
  {
    "message": "Task deleted successfully"
  }
  ```

- **Error Response**

  - Code: 400 (Bad request)
  - Response Body:

  ```json
  {
    "message": "Task not found"
  }
  ```

  - Code: 500 (Internal Server Error)
  - Response Body:

  ```json
  {
    "error": "Something went wrong"
  }
  ```

> Note: You can see an example usage in `examples/deleteTask.js`

# License

Licensed under either of

- Apache License, Version 2.0 ([LICENSE-APACHE](LICENSE-APACHE) or https://apache.org/licenses/LICENSE-2.0)
- MIT license ([LICENSE-MIT](LICENSE-MIT) or https://opensource.org/licenses/MIT)
