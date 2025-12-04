import { db } from "@/lib/db";

export async function POST(req: Request) {
    const { contentText, contentImage } = await req.json();

    const result = await db.query(
        `
            INSERT INTO posts (content_text${contentImage && ', content_image'})
            VALUES ($1${contentImage && ', $2'})
            RETURNING *
        `,
        [contentText, contentImage]
    )

    return Response.json(result.rows[0])
}