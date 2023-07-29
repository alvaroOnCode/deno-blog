import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { useState } from "preact/hooks";

export function Button(props: JSX.HTMLAttributes<HTMLButtonElement>) {
  const [like, setLike] = useState(false);

  const onClick = () => {
    setLike(!like);
  };

  return (
    <button
      {...props}
      disabled={!IS_BROWSER || props.disabled}
      class={(like
        ? "bg-red-500 text-white border-red-500 border-2"
        : "text-gray-500 border-gray-500 border-2") +
        " px-2 py-1  rounded"}
      onClick={onClick}
    >
      {like ? "Ya no me gusta" : "Me gusta"} Like
    </button>
  );
}
