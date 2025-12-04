import { Request, Response } from 'express';
import { db } from '../db';

export async function getUsers(req: Request, res: Response){
    try {
        const query = `
            SELECT * FROM users ORDER BY created_at DESC
        `

        const { rows } = await db.query(query)

        res.json(rows).status(200)
    }
    catch (error: any){
        console.log('error: ', error.message);
        res.json(error.message).status(400);
    }
}

export async function createUser(req: Request, res: Response){
    try{
        const { userName, displayName, profilePicture } = req.body

        const query = `
            INSERT INTO users (username, display_name${profilePicture ? ', profile_picture' : ''})
            VALUES ($1, $2${profilePicture ? ', $3' : ''})
            RETURNING id, username, display_name, profile_picture, created_at
        `

        const params = profilePicture ?  [userName, displayName, profilePicture] : [userName, displayName]
        const { rows } = await db.query(query, params)

        res.json(rows).status(200)
    }
    catch (error: any){
        console.log('error: ', error.message);
        res.json(error.message).status(400);
    }
}