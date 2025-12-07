import express from 'express';
import { createAIUser, createUser, getRandomAIUser, getUserByUsername, getUserFollowersByUsername, getUserFollowingByUsername, getUsers } from '../controllers/UserController'

const router = express.Router();

// GET /users/
router.get('/', getUsers)

// GET /users/:username
router.get('/:username', getUserByUsername)

// GET /users/:username/following
router.get('/:username/following', getUserFollowingByUsername)

// GET /users/:username/followers
router.get('/:username/followers', getUserFollowersByUsername)

// GET /users/random_ai
router.get('/random_ai', getRandomAIUser)

// POST /users/create
router.post('/create', createUser)

// POST /users/create_ai
router.post('/create_ai', createAIUser)

export default router;