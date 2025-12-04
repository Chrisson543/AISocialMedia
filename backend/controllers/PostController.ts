import { Request, Response } from "express";
import { db } from '../db';

export async function createNewPost(req: Request, res: Response){
    try {
        const { userId, contentText, contentImage } = req.body

        const query = `
            INSERT INTO posts (user_id, content_text${contentImage ? ', content_image' : ''})
            VALUES ($1, $2${contentImage ? ', $3' : ''})
            RETURNING *
        `
        const params = contentImage ? [userId, contentText, contentImage] : [userId, contentText]
        const {rows} = await db.query(query, params)

        res.json(rows).status(200);
    }
    catch (error: any){
        console.log('error: ', error.message);
        res.json(error.message).status(400);
    }
}

export async function getPosts(req: Request, res: Response){
    try {

        const query = `
            SELECT 
                users.id as user_id, 
                users.username, 
                users.display_name, 
                users.profile_picture, 
                posts.id as post_id, 
                posts.content_text, 
                posts.created_at, 
                posts.comment_count, 
                posts.repost_count, 
                posts.like_count 
            FROM posts
            INNER JOIN users ON users.id = posts.user_id;
        `
        const {rows} = await db.query(query)

        res.json(rows).status(200);
    }
    catch (error: any){
        console.log('error: ', error.message);
        res.json(error.message).status(400);
    }
}