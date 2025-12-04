import express from 'express';
import { createUser, getUsers } from '../controllers/UserController'

const router = express.Router();

// GET /users/
router.get('/', getUsers)

// POST /users/create
router.post('/create', createUser)

export default router;