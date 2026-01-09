import { Request, Response } from 'express';
import { db } from '../db';
import {createAIUserF, getRandomAIUserF} from '../services/userService'
import jwt from "jsonwebtoken";
import { JwtPayloadT } from '../types/jwt.types';

const JWT_SECRET = process.env.JWT_SECRET!;

export async function editProfile(req: Request, res: Response){
    try {
        const { userId, displayName, bio, profilePicture, backgroundImage } = req.body
        const query = `
            UPDATE users
            SET display_name = $2, bio = $3, profile_picture = $4, background_image = $5
            WHERE id = $1
        `

        const { rows } = await db.query(query, [ userId, displayName, bio, profilePicture, backgroundImage ])

        return res.status(200).json(rows)
    }
    catch (error: any){
        console.log('error: ', error.message);
        return res.status(400).json(error.message);
    }
}

export async function followUser(req: Request, res: Response){
    try {
        const { userId, followee } = req.body
        const query = `
            WITH followee AS (
                SELECT id FROM users
                WHERE username = $2
            )
            INSERT INTO follow_list (follower_id, followee_id)
            VALUES ($1, (SELECT id FROM followee))
        `

        const { rows } = await db.query(query, [ userId, followee ])

        return res.status(200).json(rows)
    }
    catch (error: any){
        console.log('error: ', error.message);
        return res.status(400).json(error.message);
    }
}

export async function unfollowUser(req: Request, res: Response){
    try {
        const { userId, followee } = req.body
        const query = `
            WITH followee AS (
                SELECT id FROM users
                WHERE username = $2
            )
            DELETE FROM follow_list
            WHERE follower_id = $1
            AND followee_id = (SELECT id FROM followee)
        `

        const { rows } = await db.query(query, [ userId, followee ])

        return res.status(200).json(rows)
    }
    catch (error: any){
        console.log('error: ', error.message);
        return res.status(400).json(error.message);
    }
}

export function getMe(req: Request, res: Response) {
  const token = req.cookies?.token;

  try {
    const payload = jwt.verify(token, JWT_SECRET) as JwtPayloadT;

    const user = {
        id: payload.userId,      // or number, match your DB
        username: payload.username,
        display_name: payload.displayName,
        profile_picture: payload.profilePicture
    }

    res.status(200).json(user);

  } 
  catch (error: any) {
    console.log('error: ', error.message);
    return res.status(400).json(error.message);
  }
}

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
            WHERE u.username ILIKE $1 || '%'
            OR u.display_name ILIKE $1 || '%'
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
        const { userId } = req.body
        const query = `
            SELECT u.id, u.display_name, u.username, u.bio, u.profile_picture,
            EXISTS (
                SELECT 1
                FROM follow_list f
                WHERE f.follower_id = $2
                AND f.followee_id = u.id
            ) AS followed_by_me
            FROM users u
            JOIN follow_list f ON f.follower_id = u.id
            WHERE f.followee_id = (SELECT users.id FROM users WHERE username = $1)
            ORDER BY f.created_at DESC
        `
        const { rows } = await db.query(query, [username, userId])

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
        const { userId } = req.body
        const query = `
            SELECT u.id, u.display_name, u.username, u.bio, u.profile_picture,
            EXISTS (
                SELECT 1
                FROM follow_list f
                WHERE f.follower_id = $2
                AND f.followee_id = u.id
            ) AS followed_by_me
            FROM users u
            JOIN follow_list f ON f.followee_id = u.id
            WHERE f.follower_id = (SELECT users.id FROM users WHERE username = $1)
            ORDER BY f.created_at DESC
        `
        const { rows } = await db.query(query, [username, userId])

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
        const { userId } = req.body

        const query = `
            SELECT 
                u.*, 
                (
                    SELECT COUNT (*)
                    FROM follow_list f
                    WHERE f.followee_id = u.id
                ) AS follower_count,
                (
                    SELECT COUNT (*)
                    FROM follow_list f
                    WHERE f.follower_id = u.id
                ) AS following_count,
                EXISTS (
                    SELECT 1
                    FROM follow_list f
                    WHERE f.follower_id = $2
                    AND f.followee_id = u.id
                ) AS followed_by_me
            FROM users u
            WHERE u.username = $1
        `

        const { rows } = await db.query(query, [ username, userId ])
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