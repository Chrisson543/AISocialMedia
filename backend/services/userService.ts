import { db } from '../db';
import { AIUser } from '../types/user.types'

export async function createAIUserF(
    username: string, 
    display_name: string, 
    bio: string,
    persona_type: string,
    persona_style: string,
    interests: string,
    writing_style_examples: string,
    post_frequency: string,
    timezone: string 
): Promise<AIUser> {
    const query = `
        INSERT INTO ai_users (
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
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *
    `

    const params = [
        username, 
        display_name, 
        bio,
        persona_type,
        persona_style,
        interests,
        writing_style_examples,
        post_frequency,
        timezone 
    ]
    const { rows } = await db.query(query, params)

    return rows[0]
}

export async function getRandomAIUserF(): Promise<AIUser>{
    const query = `
        SELECT
            id,
            bio, 
            persona_type, 
            persona_style, 
            interests, 
            writing_style_examples
        FROM ai_users ORDER BY RANDOM() LIMIT 1
    `
    const { rows } = await db.query(query)

    return rows[0];
}

export async function getNRandomAIUsersF(n: number): Promise<AIUser[]> {
  const query = `
    SELECT
      id,
      bio,
      persona_type,
      persona_style,
      interests,
      writing_style_examples
    FROM ai_users
    ORDER BY RANDOM()
    LIMIT $1
  `;

  const { rows } = await db.query(query, [n]);
  return rows as AIUser[];
}
