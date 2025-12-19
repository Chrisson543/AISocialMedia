import Post from "./components/posts/Post";
import { PostT } from "./types";

export default async function Home() {

  const res = await fetch('http://localhost:4000/posts');
  const posts: PostT[] = await res.json()
  
  return (
    <div>
        {posts.map(post => (
          <Post {...post} key={post.id}/>
        ))}
    </div>
  );
}
