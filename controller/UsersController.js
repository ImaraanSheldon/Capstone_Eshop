import express from 'express';
import { users } from '../model/index.js';
import bodyParser from 'body-parser';
// import path from 'path';

const userRouter = express.Router();

// Middleware to parse JSON requests
userRouter.use(bodyParser.json());

// Fetch all users
userRouter.get('/', (req, res) => {
    users.fetchUsers(req, res);
});

// Fetch a single user by ID
userRouter.get('/:id', (req, res) => {
    users.fetchUser(req, res);
});


// Register a new user
userRouter.post('/register', async (req, res) => {
    await users.registerUser(req, res);
});

// Update a user by ID
userRouter.patch('/:id', async (req, res) => {
    await users.updateUser(req, res);
});

// Delete a user by ID
userRouter.delete('/:id',  (req, res) => {
    users.deleteUser(req, res);
});

// Login a user
userRouter.post('/login', async (req, res) => {
    await users.loginUser(req, res);
});

// Hi...<3
export {
    userRouter
};