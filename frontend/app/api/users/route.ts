import { db } from "@/lib/db";

export async function GET() {
    const result = await db.query('SELECT * FROM users ORDER BY created_at DESC');
    return Response.json(result.rows);
}

export async function POST(req: Request) {
    const { username, displayName, profilePicture } = await req.json();

    const result = await db.query(
        `
            INSERT INTO users (username, display_name${profilePicture && ', profile_picture'}) 
            VALUES ($1, $2${profilePicture && ', $3'})
            RETURNING *
        `,
        [username, displayName, profilePicture]
    )

    return Response.json(result.rows[0])
}