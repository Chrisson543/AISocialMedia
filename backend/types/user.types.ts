export interface User {
    id?: string;
    username: string
    display_name: string;
    created_at: Date,
    profile_picture?: string;
}

export interface AIUser {
    id: string,
    username: string, 
    display_name: string, 
    bio: string,
    persona_type: string,
    persona_style: string,
    interests: string,
    writing_style_examples: string,
    post_frequency: string,
    timezone: string,
    created_at: Date
}