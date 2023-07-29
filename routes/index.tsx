import { getPostsConcurrently } from "/services/posts.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Post } from "/types.d.ts";
import { asset } from "$fresh/runtime.ts";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const posts = await getPostsConcurrently();
    return ctx.render({ posts });
  },
};

export default function Home(props: PageProps) {
  const { posts } = props.data;
  return (
    <main class="p-6">
      <div class="w-full mb-6 relative">
        <h1 class="text-8xl text-white font-bold mb-6 absolute top-6 left-12">
          Letanico.px
        </h1>
        <img class="w-full rounded-xl" src={"./offgrid-2.jpg"} alt="" />
        <span class="text-xs opacity-50">
          Photo by{" "}
          <a
            class="font-semibold hover:text-yellow-600 transition-colors duration-200 ease-in-out"
            href="https://unsplash.com/@jediahowen?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
          >
            Jed Owen
          </a>{" "}
          on{" "}
          <a
            class="font-semibold hover:text-yellow-600 transition-colors duration-200 ease-in-out"
            href="https://unsplash.com/photos/ZdEQ_JKizsU?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
          >
            Unsplash
          </a>
        </span>
      </div>

      <div>
        {posts.map((post: Post) => (
          <article class="mb-6 p-6 border rounded-xl hover:bg-yellow-50 transition-colors duration-200 ease-in-out">
            <div>
              <a
                class="text-lg font-semibold text-gray-800 hover:text-yellow-600 transition-colors duration-200 ease-in-out"
                href={`/blog/${post.slug}`}
              >
                {post.title}
              </a>
            </div>
            <time class="text-sm text-gray-600">
              {Intl.DateTimeFormat("es").format(post.date)}
            </time>
            <p class="text-gray-600">{post.excerpt}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
