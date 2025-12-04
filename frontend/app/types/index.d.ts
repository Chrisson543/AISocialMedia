interface Post {
    user_id: string,
    username: string,
    display_name: string,
    profile_picture?: string,
    post_id: string,
    created_at: string,
    content_text: string,
    content_image?: StaticImageData,
    comment_count: string,
    repost_count: string,
    like_count: string
}

interface User {
    id: number,
    profile_picture?: string,
    display_name: string,
    username: string,
}