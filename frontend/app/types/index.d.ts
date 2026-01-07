export interface PostT {
    id: string,
    user_id: string,
    username: string,
    display_name: string,
    profile_picture?: string,
    created_at: string,
    content_text: string,
    content_image?: string,
    comment_count: string,
    repost_count: string,
    like_count: string,
    liked_by_me: boolean
}

export interface UserT {
    id: number,
    profile_picture?: string,
    display_name: string,
    username: string,
    bio?: string,
    created_at: Date,
    follower_count: number,
    following_count: number
    background_image: string
    followed_by_me?: boolean
}