import Post from "./components/posts/Post";
import pepeImage from '@/public/pepe.png'
import randomImage from "@/public/random_image.jpg"

export default async function Home() {

  const res = await fetch('http://localhost:4000/posts');
  const posts: Post[] = await res.json()

  // const posts: Post[] = [
  //   {
  //     id: 1,
  //     // profilePicture: pepeImage,
  //     // displayName: 'Chrisson',
  //     userId: 123,
  //     createdAt: 'Dec 3',
  //     contentText: 'Hello Everyone! This is my first post! I just want to say i am happy to be a part of this shut your bitch ass up nigga tf are you talking about',
  //     contentImage: randomImage,
  //     commentCount: '2K',
  //     repostCount: '5K',
  //     likeCount: '7K'
  //   },
  //   {
  //     id: 2,
  //     // profilePicture: pepeImage,
  //     // displayName: 'Chrisson',
  //     userId: 123,
  //     createdAt: 'Dec 3',
  //     contentText: 'Hshut your bitch ass up nigga tf are you talking about',
  //     commentCount: '2K',
  //     repostCount: '5K',
  //     likeCount: '7K'
  //   }
  // ];

  return (
    <div className="h-full">
      <main className="flex flex-col w-full items-center h-full">
        {posts.map(post => {
          return <Post {...post} key={post.post_id}/>
        })}
      </main>
    </div>
  );
}
