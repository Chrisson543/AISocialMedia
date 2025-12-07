export interface Post {
    id?: string;
    user_id: string;
    content_text: string;
    content_image: string;
    created_at?: Date;
    comment_count?: number;
    repost_count?: number
    like_count?: number
}