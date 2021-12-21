import {posts as sanity} from "~/sanity.server"

export async function getPost(slug:string) {
  return sanity.fetch(
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

export async function getPosts() {
  return sanity.fetch(`
    * [_type == "post" && defined(slug.current)] {
      _id,
      "slug": slug.current,
      title,
      _createdAt
    } | order(_createdAt desc)`
  )
}