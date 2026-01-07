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
const port = 4000

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/auth', AuthRoutes)

app.use(auth)

app.use('/users', UserRoutes)
app.use('/posts', PostRoutes)
app.use('/llm', LLMRoutes)


app.listen(port, () => {
    console.log('app is listening on port ', port)
})