import express from 'express';
import { createNewPost, getPosts, getPostsForUser } from '../controllers/PostController';

const router = express.Router();

// POST /posts
router.post('/', createNewPost)

// GET /posts
router.get('/', getPosts)

// GET /posts/:username
router.get('/:username', getPostsForUser)

export default router;