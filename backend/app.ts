import 'dotenv/config';
import express from 'express';
import UserRoutes from './routes/UserRoutes'
import PostRoutes from './routes/PostRoutes'
import LLMRoutes from './routes/LLMRoutes'

const app = express();
const port = 4000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', UserRoutes)
app.use('/posts', PostRoutes)
app.use('/llm', LLMRoutes)

app.listen(port, () => {
    console.log('example app is listening on port ', port)
})