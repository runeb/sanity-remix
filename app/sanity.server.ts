import sanityClient from "@sanity/client";

// The dataset where the Sanity.io blog posts are published
export const posts = sanityClient({
  projectId: "3do82whm",
  dataset: "next",
  apiVersion: "2021-12-20",
  useCdn: true,
});

// The dataset where you want to read and write your comments
export const comments = sanityClient({
  projectId: process.env.COMMENT_PROJECT_ID,
  dataset: process.env.COMMENT_DATASET,
  apiVersion: "2021-12-20",
  useCdn: true,
  token: process.env.COMMENT_WRITE_TOKEN,
});
