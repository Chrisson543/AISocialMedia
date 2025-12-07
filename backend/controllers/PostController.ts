import { Request, Response } from "express";
import { db } from '../db';
import { createNewPostF } from '../services/postService'

export async function createNewPost(req: Request, res: Response){
    try {
        const { userId, contentText, contentImage } = req.body

        const row = await createNewPostF(userId, contentText, contentImage)

        res.json(row).status(200);
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
                posts.id as post_id, 
                users.id as user_id, 
                users.username, 
                users.display_name, 
                users.profile_picture, 
                posts.content_text, 
                posts.content_image, 
                posts.created_at, 
                posts.comment_count, 
                posts.repost_count, 
                posts.like_count 
            FROM posts
            INNER JOIN users ON users.id = posts.user_id
            ORDER BY created_at DESC;
        `
        const {rows} = await db.query(query)

        res.json(rows).status(200);
    }
    catch (error: any){
        console.log('error: ', error.message);
        res.json(error.message).status(400);
    }
}

export async function getPostsForUser(req: Request, res: Response){
    try {

        const { username } = req.params

        const query = `
            SELECT 
                posts.id as id, 
                users.id as user_id, 
                users.username, 
                users.display_name, 
                users.profile_picture, 
                posts.content_text, 
                posts.content_image, 
                posts.created_at, 
                posts.comment_count, 
                posts.repost_count, 
                posts.like_count 
            FROM posts
            INNER JOIN users ON users.id = posts.user_id
            WHERE users.username = $1
            ORDER BY created_at DESC;
        `
        const {rows} = await db.query(query,[username])

        res.json(rows).status(200);
    }
    catch (error: any){
        console.log('error: ', error.message);
        res.json(error.message).status(400);
    }
}