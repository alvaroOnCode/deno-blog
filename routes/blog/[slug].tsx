import { Handlers, PageProps } from "$fresh/server.ts";
import { getPost } from "/services/posts.ts";
import { CSS, render } from "$gfm";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const { slug } = ctx.params;
    const post = await getPost({ slug });
    return ctx.render({ post });
  },
};

export default function BlogPost(props: PageProps) {
  const { post } = props.data;
  return (
    <article class="p-4">
      <h1 class="text-2xl font-bold">{post.title}</h1>
      <h6>{post.excerpt}</h6>
      <time>{Intl.DateTimeFormat("es").format(post.date)}</time>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div
        class="markdown-body"
        dangerouslySetInnerHTML={{ __html: render(post.content) }}
      >
        {post.content}
      </div>
    </article>
  );
}
