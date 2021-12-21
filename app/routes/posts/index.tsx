import { createComment } from "~/comments";
import type { ActionFunction } from "remix";
import { redirect } from "remix"
import { getPosts } from "~/posts";

export const action: ActionFunction = async ({request}) => {
  const formData = await request.formData();
  const postId = formData.get("postId")
  const name = formData.get("name")
  const comment = formData.get("comment")
  const slug = formData.get("slug")
  await createComment(postId, name, comment)
  return redirect(`/posts/${slug}#comments`)
}

export const loader = async () => {
  return getPosts()
}
