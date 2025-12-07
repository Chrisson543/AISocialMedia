import { db } from '../db';
import { Post } from '../types/post.types'

export async function createNewPostF(
    userId: string, 
    contentText: string, 
    contentImage?: string
): Promise<Post>{
    const query = `
        INSERT INTO posts (user_id, content_text${contentImage ? ', content_image' : ''})
        VALUES ($1, $2${contentImage ? ', $3' : ''})
        RETURNING *
    `
    const params = contentImage ? [userId, contentText, contentImage] : [userId, contentText]
    const {rows} = await db.query(query, params)

    return rows[0]
}

export async function createNewAIPostF(
    userId: string, 
    contentText: string, 
    contentImage?: string
): Promise<Post>{
    const query = `
        INSERT INTO ai_posts (user_id, content_text${contentImage ? ', content_image' : ''})
        VALUES ($1, $2${contentImage ? ', $3' : ''})
        RETURNING *
    `
    const params = contentImage ? [userId, contentText, contentImage] : [userId, contentText]
    const {rows} = await db.query(query, params)

    return rows[0]
}