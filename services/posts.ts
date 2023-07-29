import { Post } from "/types.d.ts";
import { parse } from "https://deno.land/x/frontmatter/mod.ts";

export async function getPost(
  { slug }: { slug: string },
): Promise<Post | null> {
  const raw = await Deno.readTextFile(`./content/posts/${slug}.md`).catch(() =>
    null
  );
  if (!raw) return null;

  const parsed = parse(raw);

  const post: Post = {
    slug,
    title: parsed.data.title,
    date: parsed.data.date,
    excerpt: parsed.data.excerpt,
    content: parsed.content,
  };

  return post;
}

export async function getPostsSequentially(): Promise<Post[]> {
  const files = Deno.readDir("./content/posts");
  const posts: Post[] = [];

  for await (const file of files) {
    const [slug] = file.name.split(".");
    const post = await getPost({ slug });
    if (post) posts.push(post);
  }

  return posts.sort((a: Post, b: Post) => b.date.getTime() - a.date.getTime());
}

export async function getPostsConcurrently(): Promise<Post[]> {
  const files = Deno.readDir("./content/posts");
  const promises = [];

  for await (const file of files) {
    const [slug] = file.name.split(".");
    promises.push(getPost({ slug }));
  }

  const posts = await Promise.all(promises) as Post[];

  posts.sort((a: Post, b: Post) => b.date.getTime() - a.date.getTime());

  return posts;
}
