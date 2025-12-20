import { Request, Response } from "express";
import { db } from '../db';
import { createNewPostF } from '../services/postService'

export async function createNewPost(req: Request, res: Response){
    try {
        const { userId, contentText, contentImage } = req.body

        const row = await createNewPostF(userId, contentText, contentImage)

        return res.status(200).json(row);
    }
    catch (error: any){
        console.log('error: ', error.message);
        return res.status(400).json(error.message);
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

        return res.status(200).json(rows);
    }
    catch (error: any){
        console.log('error: ', error);
        return res.status(400).json(error);
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

        return res.status(200).json(rows);
    }
    catch (error: any){
        console.log('error: ', error.message);
        return res.status(400).json(error.message);
    }
}