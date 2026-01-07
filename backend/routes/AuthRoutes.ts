import express from 'express';
import { createUser, LogIn } from '../controllers/AuthController';

const router = express.Router()

// POST /auth/create_account
router.post('/create_account', createUser);

// POST /auth/login
router.post('/login', LogIn);

export default router;