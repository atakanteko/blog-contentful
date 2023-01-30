import React from "react";
import Image from "next/image";
import { Card, Text, AspectRatio, createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  card: {
    transition: "transform 150ms ease, box-shadow 150ms ease",

    "&:hover": {
      transform: "scale(1.01)",
      boxShadow: theme.shadows.md,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 600,
  },
}));

function BlogCard({ item, createdAt }) {
  const { title, thumbnail, slug } = item.fields;
  const { classes } = useStyles();
  return (
    <Card p="md" radius="md" component="a" href="#" className={classes.card}>
      <AspectRatio ratio={1920 / 1080}>
        <Image
          src={`https:${thumbnail.fields.file.url}`}
          width={425}
          height={245}
          alt={title}
        />
      </AspectRatio>
      <Text color="dimmed" size="xs" transform="uppercase" weight={700} mt="md">
        {createdAt}
      </Text>
      <Text className={classes.title} mt={5}>
        {title}
      </Text>
    </Card>
  );
}

export default BlogCard;
