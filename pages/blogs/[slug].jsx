import React from "react";
import { createClient } from "contentful";
import Image from "next/image";
import { dateFormatter } from "@/helper/dateFormatter";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";

function BlogDetail({ blogDetail }) {
  console.log(blogDetail);
  const { blogContent, thumbnail, title } = blogDetail.fields;

  const renderOptions = {
    renderNode: {
      [BLOCKS.EMBEDDED_ENTRY]: (node, children) => {
        // target the contentType of the EMBEDDED_ENTRY to display as you need
        if (node.data.target.sys.contentType.sys.id === "codeBlock") {
          return (
            <pre>
              <code>{node.data.target.fields.code}</code>
            </pre>
          );
        }

        if (node.data.target.sys.contentType.sys.id === "videoEmbed") {
          return (
            <iframe
              src={node.data.target.fields.embedUrl}
              height="100%"
              width="100%"
              frameBorder="0"
              scrolling="no"
              title={node.data.target.fields.title}
              allowFullScreen={true}
            />
          );
        }
      },

      [BLOCKS.EMBEDDED_ASSET]: (node, children) => {
        // render the EMBEDDED_ASSET as you need
        return (
          <Image
            src={`https://${node.data.target.fields.file.url}`}
            height={node.data.target.fields.file.details.image.height}
            width={node.data.target.fields.file.details.image.width}
            alt={node.data.target.fields.description}
          />
        );
      },
    },
  };
  return (
    <div style={{ width: "80%", margin: "auto" }}>
      <div className="banner">
        <Image
          src={"https://" + thumbnail.fields.file.url}
          width={thumbnail.fields.file.details.image.width}
          height={thumbnail.fields.file.details.image.height}
          alt={title}
        />
        <h2>{title}</h2>
        <h4>{dateFormatter(blogDetail.sys.createdAt)}</h4>
      </div>
      <div className="content">
        <div>{documentToReactComponents(blogContent, renderOptions)}</div>
      </div>
    </div>
  );
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
    props: { blogDetail: res.items[0] }, // will be passed to the page component as props
  };
}
export default BlogDetail;
