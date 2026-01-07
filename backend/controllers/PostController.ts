import { Request, Response } from "express";
import { db } from '../db';
import { createNewPostF } from '../services/postService'

export async function deletePost(req: Request, res: Response) {
  try {
    const { postId, userId } = req.body;

    const query = `
        WITH deleted_likes AS (
            DELETE FROM post_likes
            WHERE post_id = $1
        ),
        deleted_post AS (
            DELETE FROM posts
            WHERE id = $1
            AND user_id = $2
            RETURNING id
        )
        SELECT id FROM deleted_post;
    `;

    const result = await db.query(query, [postId, userId]);

    // No row deleted → post doesn't exist OR user doesn't own it
    if (result.rowCount === 0) {
      return res.status(403).json({
        message: "You are not allowed to delete this post",
      });
    }

    return res.status(200).json({
      message: "Post deleted successfully",
      postId: result.rows[0].post_id,
    });
  } catch (error: any) {
    console.error("error:", error.message);
    return res.status(500).json({ message: "Failed to delete post" });
  }
}


export async function likePost(req: Request, res: Response){
    try{
        const {postId, userId} = req.body

        const query = `
            INSERT INTO post_likes (post_id, user_id)
            VALUES ($1, $2)
        `

        const { rows } = await db.query(query, [postId, userId])

        res.status(200).json(rows)
    }
    catch(error: any){
        console.log('error: ', error.message);
        return res.status(400).json(error.message);
    }
}

export async function removePostLike(req: Request, res: Response){
    try{
        const {postId, userId} = req.body

        const query = `
            DELETE FROM post_likes
            WHERE post_id = $1
            AND user_id = $2
        `

        const { rows } = await db.query(query, [postId, userId])

        res.status(200).json(rows)
    }
    catch(error: any){
        console.log('error: ', error.message);
        return res.status(400).json(error.message);
    }
}

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
        const { userId } = req.body

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
                (
                    SELECT COUNT(*) FROM post_likes
                    WHERE post_likes.post_id = posts.id
                ) as like_count,
                EXISTS (
                    SELECT 1
                    FROM post_likes pl2
                    WHERE pl2.post_id = posts.id
                    AND pl2.user_id = $1
                ) AS liked_by_me
            FROM posts
            INNER JOIN users ON users.id = posts.user_id
            ORDER BY created_at DESC;
        `
        const {rows} = await db.query(query, [userId])

        return res.status(200).json(rows);
    }
    catch (error: any){
        console.log('error: ', error);
        return res.status(400).json(error);
    }
}

export async function getPostsForUser(req: Request, res: Response){
    try {

        const { author } = req.params
        const { viewer } = req.body

        const query = `
            WITH viewer AS (
            SELECT id
            FROM users
            WHERE username = $1
            )
            SELECT 
            posts.id AS id,
            author.id AS user_id,
            author.username,
            author.display_name,
            author.profile_picture,
            posts.content_text,
            posts.content_image,
            posts.created_at,
            posts.comment_count,
            posts.repost_count,
            COUNT(pl.post_id)::int AS like_count,
            BOOL_OR(pl.user_id = (SELECT id FROM viewer)) AS liked_by_me
            FROM posts
            JOIN users author ON author.id = posts.user_id
            LEFT JOIN post_likes pl ON pl.post_id = posts.id
            WHERE author.username = $2
            GROUP BY posts.id, author.id
            ORDER BY posts.created_at DESC;
        `
        const {rows} = await db.query(query,[viewer, author])

        return res.status(200).json(rows);
    }
    catch (error: any){
        console.log('error: ', error.message);
        return res.status(400).json(error.message);
    }
}