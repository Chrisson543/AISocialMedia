import { db } from '../db';
import bcrypt from 'bcryptjs';

export async function checkUsernameExists(
    username: string
): Promise<boolean>{
    const userExistsQuery = `
        SELECT * FROM users
        WHERE username = $1
    `

    const { rows } = await db.query(userExistsQuery, [username])
    const userExists = rows.length > 0;

    return userExists
}

export async function checkPasswordCorrect(
    username: string,
    password: string
): Promise<boolean>{

    const query = `
            SELECT password_hash
            FROM users
            WHERE username = $1
        `

    const { rows } = await db.query(query, [username])
    const password_hash = rows[0].password_hash

    const isPasswordCorrect = await bcrypt.compare(
        password,
        password_hash
    )

    return isPasswordCorrect
}