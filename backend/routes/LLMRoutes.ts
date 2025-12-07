import express from 'express';
import { generateAIPost, generateAIUser, generateNAIPosts, generateNAIUsers } from '../controllers/LLMController';

const router = express.Router()

//GET /llm/create_ai_user
router.get('/create_ai_user', generateAIUser)

//GET /llm/create_ai_user/:nUsers
router.get('/create_ai_user/:nUsers', generateNAIUsers)

//GET /llm/create_ai_post
router.get('/create_ai_post', generateAIPost)

//GET /llm/create_ai_post/:nUsers
router.get('/create_ai_post/:nUsers', generateNAIPosts)

export default router;