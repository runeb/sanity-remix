import {posts as sanity} from "~/sanity.server"

interface Post {
  _id: string
  slug: string
  title: string
  authors: {
    name: string
    email?: string
  }[]
  text: any[]
}

export async function getPost(slug:string) {
  return sanity.fetch<Post>(
    `* [_type == "post" && slug.current == $slug] {
      _id,
      "slug": $slug,
      title, authors[]->{
        name,
        "email": webPresence.email,
      },
      text[] {
        ...,
        _type == "image" || _type == "ui.screenshot" => {
          ...,
          "_type": "image",
          asset->{url}
        },
        _type == "muxVideo" => {
          "playback_id": asset->data.playback_ids[0].id
        }
      }
    }[0]`,
    {slug}
  );
}

interface PostSummary {
  _id: string
  slug: string
  title: string
  _createdAt: number
}

export async function getPosts() {
  return sanity.fetch<PostSummary[]>(`
    * [_type == "post" && defined(slug.current)] {
      _id,
      "slug": slug.current,
      title,
      _createdAt
    } | order(_createdAt desc)`
  )
}