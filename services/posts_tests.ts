// Test to check if the posts service is working correctly
import { getPost, getPostsConcurrently } from "./posts.ts";
import { assertEquals } from "$std/testing/asserts.ts";

Deno.test("getPost return null if file does not exist", async () => {
  const post = await getPost({ slug: "non-existent" });

  assertEquals(post, null);
});

Deno.test("getPost return post if file exists", async () => {
  const post = await getPost({ slug: "hello-world" });

  assertEquals(post?.slug, "hello-world");
});

Deno.test("getPostsConcurrently return all posts", async () => {
  const posts = await getPostsConcurrently();

  assertEquals(posts.length, 2);
});
