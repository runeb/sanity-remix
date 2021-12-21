import sanityClient from "@sanity/client";

export const posts = sanityClient({
  projectId: "3do82whm",
  dataset: "next",
  apiVersion: "2021-12-12",
  useCdn: true,
});

export const comments = sanityClient({
  projectId: "xg4e0byh",
  dataset: "comments",
  apiVersion: "2021-12-12",
  useCdn: false,
  token: process.env.COMMENT_WRITE_TOKEN
});