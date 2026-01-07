import express from 'express';
import { createNewPost, deletePost, getPosts, getPostsForUser, likePost, removePostLike } from '../controllers/PostController';

const router = express.Router();

// POST /posts
router.post('/new_post', createNewPost)

// GET /posts
router.post('/get_posts', getPosts)

// POST /posts/like
router.post('/like', likePost)

// POST /posts/removeLike
router.post('/removeLike', removePostLike)

// GET /posts/delete
router.post('/delete', deletePost)

// GET /posts/:username
router.post('/:author', getPostsForUser)


export default router;