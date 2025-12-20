import { Request, Response } from 'express';
import { db } from '../db';
import {createAIUserF, getRandomAIUserF} from '../services/userService'

export async function getUserByUsernameMatch(req: Request, res: Response){
    try {
        const { username } = req.params
        const query = `
            SELECT 
                u.*, 
                (
                    SELECT COUNT (*)
                    FROM follow_list f
                    WHERE f.follower_id = u.id
                ) AS follower_count,
                (
                    SELECT COUNT (*)
                    FROM follow_list f
                    WHERE f.followee_id = u.id
                ) AS following_count
            FROM users u
            WHERE u.username like '%' || $1 || '%'
        `

        const { rows } = await db.query(query, [username])

        return res.status(200).json(rows)
    }
    catch (error: any){
        console.log('error: ', error.message);
        return res.status(400).json(error.message);
    }
}

export async function getUserFollowersByUsername(req: Request, res: Response){
    try {
        const {username} = req.params
        const query = `
            SELECT u.id, u.display_name, u.username, u.bio, u.profile_picture
            FROM users u
            JOIN follow_list f ON f.follower_id = u.id
            WHERE f.followee_id = (SELECT users.id FROM users WHERE username = $1)
        `
        const { rows } = await db.query(query, [username])

        return res.status(200).json(rows)
    }
    catch (error: any){
        console.log('error: ', error.message);
        return res.status(400).json(error.message);
    }
}

export async function getUserFollowingByUsername(req: Request, res: Response){
    try {
        const {username} = req.params
        const query = `
            SELECT u.id, u.display_name, u.username, u.bio, u.profile_picture
            FROM users u
            JOIN follow_list f ON f.followee_id = u.id
            WHERE f.follower_id = (SELECT users.id FROM users WHERE username = $1)
        `
        const { rows } = await db.query(query, [username])

        return res.status(200).json(rows)
    }
    catch (error: any){
        console.log('error: ', error.message);
        return res.status(400).json(error.message);
    }
}

export async function getUsers(req: Request, res: Response){
    try {
        const query = `
            SELECT * FROM users ORDER BY created_at DESC
        `

        const { rows } = await db.query(query)

        return res.status(200).json(rows)
    }
    catch (error: any){
        console.log('error: ', error.message);
        return res.status(400).json(error.message);
    }
}

export async function getUserByUsername(req: Request, res: Response){
    try {
        const { username } = req.params
        const query = `
            SELECT 
                u.*, 
                (
                    SELECT COUNT (*)
                    FROM follow_list f
                    WHERE f.follower_id = u.id
                ) AS follower_count,
                (
                    SELECT COUNT (*)
                    FROM follow_list f
                    WHERE f.followee_id = u.id
                ) AS following_count
            FROM users u
            WHERE u.username = $1
        `

        const { rows } = await db.query(query, [username])
        const user = rows[0]
        
        if(!user){return res.status(404).json({message: 'User not found.'})}

        return res.status(200).json(user)
    }
    catch (error: any){
        console.log('error: ', error.message);
        return res.status(400).json(error.message);
    }
}

export async function getRandomAIUser(req: Request, res: Response){
    try {
        const rows = await getRandomAIUserF();

        return res.status(200).json(rows)
    }
    catch (error: any){
        console.log('error: ', error.message);
        return res.status(400).json(error.message);
    }2
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

        return res.status(200).json(rows)
    }
    catch (error: any){
        console.log('error: ', error.message);
        return res.status(400).json(error.message);
    }
}

export async function createAIUser(req: Request, res: Response){
    try{
        const {
            username, 
            display_name, 
            bio,
            persona_type,
            persona_style,
            interests,
            writing_style_examples,
            post_frequency,
            timezone 
        } = req.body

        const rows = await createAIUserF(
            username, 
            display_name, 
            bio,
            persona_type,
            persona_style,
            interests,
            writing_style_examples,
            post_frequency,
            timezone 
        )

        return res.status(200).json(rows)
    }
    catch (error: any){
        console.log('error: ', error.message);
        return res.status(400).json(error.message);
    }
}

// export async function createAIUser(req: Request, res: Response){
//     try{
//         const {
//             username, 
//             display_name, 
//             bio,
//             persona_type,
//             persona_style,
//             interests,
//             writing_style_examples,
//             post_frequency,
//             timezone 
//         } = req.body

//         const query = `
//             INSERT INTO ai_users (
//                 username, 
//                 display_name, 
//                 bio,
//                 persona_type,
//                 persona_style,
//                 interests,
//                 writing_style_examples,
//                 post_frequency,
//                 timezone 
//             )
//             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
//             RETURNING *
//         `

//         const params = [
//             username, 
//             display_name, 
//             bio,
//             persona_type,
//             persona_style,
//             interests,
//             writing_style_examples,
//             post_frequency,
//             timezone 
//         ]
//         const { rows } = await db.query(query, params)

//         res.json(rows).status(200)
//     }
//     catch (error: any){
//         console.log('error: ', error.message);
//         res.json(error.message).status(400);
//     }
// }