import { SimpleGrid, Container } from "@mantine/core";
import { createClient } from "contentful";
import BlogCard from "@/components/ui/BlogCard";
import { dateFormatter } from "@/helper/dateFormatter";

function Home({ blogs }) {
  return (
    <Container py="xl">
      <SimpleGrid cols={2} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
        {blogs.map((item) => (
          <BlogCard
            key={item.sys.id}
            item={item}
            createdAt={dateFormatter(item.sys.createdAt)}
          />
        ))}
      </SimpleGrid>
    </Container>
  );
}

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  });

  const res = await client.getEntries({ content_type: "blog" });
  return {
    props: {
      blogs: res.items,
    },
  };
}

export default Home;
