import { getPost } from "~/posts";
import { getComments } from "~/comments";
import { useLoaderData, Form, useTransition } from "remix";
import type { LoaderFunction } from "remix";
import { PortableText } from "~/PortableText";
import { redirect } from "next/dist/server/api-utils";

export const loader: LoaderFunction = async ({ params }) => {
  const post = await getPost(params.slug);
  const comments = await getComments(post._id);
  return { post, comments };
};

const Byline = ({ authors }: any) => {
  return <small>By: {authors.map((a: any) => a.name).join(", ")}</small>;
};

const Comment = ({ comment }) => {
  const date = new Date(comment._createdAt);
  return (
    <div style={{ padding: "20px" }}>
      <span>{comment.name} said:</span>
      <br />
      <small>
        {date.toLocaleDateString()} {date.toLocaleTimeString()}
      </small>
      <br />
      <span>{comment.comment}</span>
    </div>
  );
};

export default () => {
  const { post, comments } = useLoaderData();
  const t = useTransition();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      {/* <pre>{JSON.stringify(post, null, 4)}</pre> */}
      <h1>{post.title}</h1>
      <Byline authors={post.authors} />
      <PortableText blocks={post.text} />
      <a id="comments">
        <h2>Comments</h2>
      </a>
      <Form reloadDocument method="post" action="/posts">
        <input
          readOnly
          type="text"
          id="slug"
          name="slug"
          value={post.slug}
          hidden
        />
        <input
          readOnly
          type="text"
          id="postId"
          name="postId"
          value={post._id}
          hidden
        />
        <label htmlFor="name">Name:</label>
        <br />
        <input type="text" id="name" name="name"></input>
        <br />
        <label htmlFor="comment">Comment:</label>
        <br />
        <textarea id="comment" name="comment"></textarea>
        <br />
        <button type="submit">
          {t.state === "submitting" ? "Sending…" : "Send"}
        </button>
      </Form>
      <p>
        <small>Comments will appear after moderation</small>
      </p>
      {comments.length === 0
        ? "No comments yet"
        : comments.map((c) => <Comment key={c._id} comment={c} />)}
    </div>
  );
};
