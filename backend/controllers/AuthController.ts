import { Request, Response } from 'express';
import { db } from '../db';
import { checkPasswordCorrect, checkUsernameExists } from '../services/authservice'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JwtPayloadT } from '../types/jwt.types'

export async function createUser(req: Request, res: Response){
    try{
        const {
            displayName,
            username, 
            password
        } = req.body

        const usernameExists = await checkUsernameExists(username);
        
        if(usernameExists){return res.status(400).json({message: 'Username already exists.'})}

        const password_hash = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS)!)

        const createUserQuery = `
            WITH new_user AS (
                INSERT INTO users (username, display_name, password_hash)
                VALUES ($1, $2, $3)
                RETURNING id, username, display_name, profile_picture
            ),
            insert_follow AS (
                INSERT INTO follow_list (follower_id, followee_id)
                SELECT 
                    new_user.id,
                    '477b323a-d2a4-484e-b4c6-c5c0c9b78e05'
                FROM new_user
                RETURNING follower_id
            ),
            insert_following AS (
                INSERT INTO follow_list (followee_id, follower_id)
                SELECT 
                    new_user.id,
                    '477b323a-d2a4-484e-b4c6-c5c0c9b78e05'
                FROM new_user
                RETURNING followee_id
            )
            SELECT
                new_user.id,
                new_user.username,
                new_user.display_name,
                new_user.profile_picture
            FROM new_user;
        `

        const { rows } = await db.query(createUserQuery, [username, displayName, password_hash])

        const user = rows[0]

        const JWT_SECRET = process.env.JWT_SECRET!

        const payload: JwtPayloadT = { 
            userId : user.id,
            username: user.username,
            displayName: user.display_name,
            profilePicture: user.profile_picture
        }

        const token = jwt.sign(
            payload,
            JWT_SECRET,
            { expiresIn: "24h" }
        )

        return res.status(200).json({ token })
    }
    catch (error: any){
        console.log('error: ', error.message);
        return res.status(400).json(error.message);
    }
}

export async function LogIn(req: Request, res: Response){
    try{
        const {
            username, 
            password
        } = req.body

        const usernameExists = await checkUsernameExists(username);
        
        if(!usernameExists){return res.status(401).json({message: 'User does not exist.'})}

        const isPasswordCorrect = await checkPasswordCorrect(username, password)

        if (!isPasswordCorrect) return res.status(401).json({message: "Invalid Credentials."})

        const query = `
            SELECT id, username, display_name, profile_picture
            FROM users
            WHERE username = $1
        `
        const { rows } = await db.query(query, [username])
        const user = rows[0]
        
        const JWT_SECRET = process.env.JWT_SECRET!

        const payload: JwtPayloadT = { 
            userId : user.id,
            username: user.username,
            displayName: user.display_name,
            profilePicture: user.profile_picture
        }

        const token = jwt.sign(payload,
            JWT_SECRET,
            { expiresIn: "24h" }
        )

        return res.status(200).json({ token })
    }
    catch (error: any){
        console.log('error: ', error.message);
        return res.status(400).json(error.message);
    }
}