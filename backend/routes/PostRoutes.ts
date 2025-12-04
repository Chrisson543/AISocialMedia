import express from 'express';
import { createNewPost, getPosts } from '../controllers/PostController';

const router = express.Router();

router.post('/', createNewPost)
router.get('/', getPosts)

export default router;