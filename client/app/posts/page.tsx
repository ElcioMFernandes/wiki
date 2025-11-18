import { listPosts } from "@/actions/posts";
import Link from "next/link";

export default async function Posts() {
  const posts = await listPosts();

  return (
    <div className="p-8">
      <nav className="flex flex-row items-center justify-between p-2">
        <h1 className="text-3xl font-bold">Posts</h1>
      </nav>
      <ul className="mt-4 space-y-2">
        {posts.length === 0 ? (
          <p>No posts found</p>
        ) : (
          posts.map((post) => (
            <li key={post.id}>
              <Link href={`/posts/${post.id}`}>{post.title}</Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
