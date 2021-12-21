import {comments as sanity} from "~/sanity.server"
import {nanoid} from "nanoid"

export type Comment = {
  _createdAt: number;
  postId: string;
  name: string;
  comment: string;
};

export async function getComments(postId:string) {
  return sanity.fetch(`
  * [_type == "comment" && postId == $postId && !(_id in path("drafts.*"))] | order(_createdAt desc)`, {postId})
}

export async function createComment(postId:string, name:string, comment:string) {
  const _id = nanoid(16)
  return sanity.create({
    _id: `drafts.${_id}`,
    _type: "comment",
    name,
    comment,
    postId
  }).then(doc => {
    console.log("QHWT?")
    return doc
  })
}