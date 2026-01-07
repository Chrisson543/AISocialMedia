import 'dotenv/config';
import express from 'express';
import UserRoutes from './routes/UserRoutes'
import PostRoutes from './routes/PostRoutes'
import LLMRoutes from './routes/LLMRoutes'
import AuthRoutes from './routes/AuthRoutes';
import cors from "cors";
import { auth } from './middleware/auth'
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_ORIGIN,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/auth', AuthRoutes)

app.use('/users', auth, UserRoutes)
app.use('/posts', auth, PostRoutes)
app.use('/llm', auth, LLMRoutes)


export default app