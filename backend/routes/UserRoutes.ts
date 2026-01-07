import express from 'express';
import { createAIUser, createUser, editProfile, followUser, getMe, getRandomAIUser, getUserByUsername, getUserByUsernameMatch, getUserFollowersByUsername, getUserFollowingByUsername, getUsers, unfollowUser } from '../controllers/UserController'

const router = express.Router();

// GET /users/
router.get('/', getUsers)

// GET /users/me
router.get('/me', getMe)

// GET /users/random_ai
router.get('/random_ai', getRandomAIUser)

// POST /users/create
// router.post('/create', createUser)

// POST /users/create_ai
router.post('/create_ai', createAIUser)

// POST /users/follow
router.post('/follow', followUser)

// POST /users/unfollow
router.post('/unfollow', unfollowUser)

// GET /users/search/:username
router.get('/search/:username', getUserByUsernameMatch)

// GET /users/:username/following
router.post('/:username/following', getUserFollowingByUsername)

// GET /users/:username/followers
router.post('/:username/followers', getUserFollowersByUsername)

// GET /users/edit_profile
router.post('/edit_profile', editProfile)

// POST /users/:username
router.post('/:username', getUserByUsername)

export default router;