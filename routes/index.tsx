import { getPostsConcurrently } from "/services/posts.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Post } from "/types.d.ts";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const posts = await getPostsConcurrently();
    return ctx.render({ posts });
  },
};

export default function Home(props: PageProps) {
  const { posts } = props.data;
  return (
    <main class="p-4">
      <h1 class="text-2xl font-bold mb-4">Esa Chesca ❤️</h1>

      {posts.map((post: Post) => (
        <article class="mb-4">
          <a class="hover:text-blue-600" href={`/blog/${post.slug}`}>
            {post.title}
          </a>
          <p>{post.excerpt}</p>
          <time>{Intl.DateTimeFormat("es").format(post.date)}</time>
        </article>
      ))}
    </main>
  );
}
