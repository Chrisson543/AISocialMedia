import Post from "@/app/components/Post";
import Tabs from "@/app/components/Tabs";
import { PostT } from "@/app/types";
import { baseUrl } from "@/lib/api-config";

export default async function Home() {

  const res = await fetch(`${baseUrl}/posts`);
  const posts: PostT[] = await res.json()

  const tabViews = [
    {
      name: 'For you',
      items: posts.map(post =>
        <Post {...post} key={post.post_id}/>
      )
    }
  ]
  
  return (
    <div className="flex w-full h-full">
        <Tabs tabViews={tabViews}/>
    </div>
  );
}
