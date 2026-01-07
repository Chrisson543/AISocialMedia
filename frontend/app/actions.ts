"use server";

import { apiFetch, getUser } from "@/lib/api-helpers"
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation"

async function setTokenCookie(token: string) {
  const cookieStore = await cookies();

  cookieStore.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24, // 24h
  });
}

export async function editProfile(
    prevState: string,
    formData: FormData

){
    try {
        const user = await getUser();
        const displayName = formData.get("display-name") as string
        const bio = formData.get("bio") as string
        const profilePicture = formData.get("profile-picture") as string
        const backgroundeImage = formData.get("background_image") as string

        if(!displayName){
            return "Invalid Display Name"
        }

        const res = await apiFetch<any>('/users/edit_profile', {
            method: "POST",
            body: {
                userId: user.id,
                displayName,
                bio,
                profilePicture, 
                backgroundeImage
            }
        }) 

    }
    catch(err: any){
        console.log(err.message)
        return err.message
    }
    const user = await getUser();
    redirect(`/${user.username}`)
}

export async function createAccount(
    prevState: string,
    formData: FormData

){
    const username = formData.get("username") as string
    const displayName = formData.get("display-name") as string
    const password = formData.get("password") as string

    if(!username){
        return "Invalid Username"
    }

    if(!displayName){
        return "Invalid Display Name"
    }

    if(!password){
        return "Invalid Password"
    }

    try {

        const res = await apiFetch<{ token: string }>(`/auth/create_account`, {
            method: "POST",
            body: { displayName, username, password }
        })

        setTokenCookie(res.token);
    }
    catch(err: any){
        console.log(err.message)
        return err.message
    }
    redirect('/')
}

export async function signIn(
    prevState: string,
    formData: FormData

){
    const username = formData.get("username") as string
    const password = formData.get("password") as string

    if(!username){
        return "Invalid Username"
    }

    if(!password){
        return "Invalid Password"
    }

    try {

        const res = await apiFetch<{ token: string }>(`/auth/login`, {
            method: "POST",
            body: { username, password }
        })

        setTokenCookie(res.token);
    }
    catch(err: any){
        console.log(err.message)
        return err.message
    }
    redirect('/')
}

export async function logout(){
    const cookieStore = await cookies()
    cookieStore.delete("token")

    redirect("/login")
}

export async function likePost(
    prevState: { error?: string},
    formData: FormData
){
    "use server"
    try{
        const postId = formData.get("postId") as string;
        const author = formData.get("author") as string;
        const user = await getUser();
        const res = await apiFetch<any>('/posts/like', {
            method: "POST",
            body: {
                postId: postId,
                userId: user.id
            }
        }) 

        revalidatePath("/")
        revalidatePath(`/${author}`)

        return res
    }
    catch(error: any){
        console.log(error)
        console.log("error: ", error.message)

        return {error: error.message}
    }
}

export async function removeLike(
    prevState: { error?: string},
    formData: FormData
){
    "use server"
    try{
        const postId = formData.get("postId") as string;
        const author = formData.get("author") as string;
        const user = await getUser();
        const res = await apiFetch<any>('/posts/removeLike', {
            method: "POST",
            body: {
                postId: postId,
                userId: user.id
            }
        }) 
        console.log(res)

        revalidatePath("/")
        revalidatePath(`/${author}`)

        return res
    }
    catch(error: any){
        console.log(error)
        console.log("error: ", error.message)

        return {error: error.message}
    }
}

export async function createPost(
    prevState: { error?: string},
    formData: FormData
){
    "use server"
    try{
        // userId, contentText, contentImage
        const contentText = formData.get("contentText") as string

        const user = await getUser();
        const res = await apiFetch<any>('/posts/new_post', {
            method: "POST",
            body: {
                userId: user.id,
                contentText
            }
        }) 

        revalidatePath("/")
        revalidatePath(`/${user.username}`)

        return res
    }
    catch(error: any){
        console.log(error)
        console.log("error: ", error.message)

        return {error: error.message}
    }
}

export async function deletePost(
    formData: FormData
){
    "use server"
    try{
        // userId, contentText, contentImage
        const postId = formData.get("postId") as string

        const user = await getUser();
        const res = await apiFetch<any>('/posts/delete', {
            method: "POST",
            body: {
                userId: user.id,
                postId
            }
        }) 

        revalidatePath("/")
        revalidatePath(`/${user.username}`)

        return res
    }
    catch(error: any){
        console.log(error)
        console.log("error: ", error.message)

        return {error: error.message}
    }
}

export async function followUser(
    formData: FormData
){
    "use server"
    try{
        // userId, contentText, contentImage
        const followee = formData.get("followee") as string

        const user = await getUser();
        const res = await apiFetch<any>('/users/follow', {
            method: "POST",
            body: {
                userId: user.id,
                followee
            }
        }) 

        revalidatePath("/")
        revalidatePath(`/${user.username}`)

        return res
    }
    catch(error: any){
        console.log(error)
        console.log("error: ", error.message)

        return {error: error.message}
    }
}

export async function unfollowUser(
    formData: FormData
){
    "use server"
    try{
        // userId, contentText, contentImage
        const followee = formData.get("followee") as string

        const user = await getUser();
        const res = await apiFetch<any>('/users/unfollow', {
            method: "POST",
            body: {
                userId: user.id,
                followee
            }
        }) 

        revalidatePath("/")
        revalidatePath(`/${user.username}`)

        return res
    }
    catch(error: any){
        console.log(error)
        console.log("error: ", error.message)

        return {error: error.message}
    }
}