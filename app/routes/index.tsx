import {Link} from "remix"
import {getPosts} from "~/posts"
import { useLoaderData } from "remix";
import type { LoaderFunction } from "remix";

export const loader: LoaderFunction = getPosts

export default () => {
  const posts = useLoaderData()
  return (
    <div>
      <h1>Blog Posts</h1>
      <ul>
        {posts.map((p: any) => (
          <li key={p._id}>
            <Link to={`/posts/${p.slug}`}>{p.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}