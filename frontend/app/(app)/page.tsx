import Post from "@/app/components/Post/Post";
import Tabs from "@/app/components/Tabs";
import { PostT } from "@/app/types";
import { apiFetch, getUser } from "@/lib/api-helpers";
import { JSX } from "react";
import IntroPopover from "../components/IntroPopover";

export default async function Home() {

  let tabViews: {
    name: string,
    items: JSX.Element[];
  }[] = [];

  try{
    const user = await getUser();

    const posts = await apiFetch<PostT[]>(`/posts/get_posts`, {
      method: "POST",
      redirectOn401: true,
      body: {
        userId: user.id
      }
    })

    tabViews = [
      {
        name: 'For you',
        items: posts.map(post =>
          <Post {...post} key={post.id}/>
        )
      }
    ]
  }
  catch(error: any){
    console.log(error.message)

    throw error
  }
  
  return (
    <div className="flex w-full h-full relative overflow-y-auto">
      <Tabs tabViews={tabViews}/>
      <IntroPopover />
    </div>
  );
}
