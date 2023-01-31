import React from "react";
import { createClient } from "contentful";

function BlogDetail({ blogContent }) {
  console.log(blogContent);
  return <div>BlogDetail</div>;
}

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
});

export async function getStaticPaths() {
  const res = await client.getEntries({ content_type: "blog" });

  const paths = res.items.map((item) => ({
    params: { slug: item.fields.slug },
  }));

  // { fallback: false } means other routes should 404
  return { paths, fallback: false };
}

export async function getStaticProps(context) {
  const { params } = context;
  const res = await client.getEntries({
    content_type: "blog",
    "fields.slug": params.slug,
  });
  return {
    props: { blogContent: res.items }, // will be passed to the page component as props
  };
}
export default BlogDetail;
