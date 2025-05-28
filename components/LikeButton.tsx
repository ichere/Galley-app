import { useEffect, useState } from "react";
import supabase from "../lib/supabaseClient";

export const LikeButton = ({ imageId }: { imageId: string }) => {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(0);
  const user = supabase.auth.user();

  useEffect(() => {
    const fetchLikes = async () => {
      const { data, count } = await supabase
        .from("likes")
        .select("*", { count: "exact" })
        .eq("image_id", imageId);

      setCount(count || 0);
      if (user) {
        const userLike = data?.find((l) => l.user_id === user.id);
        setLiked(!!userLike);
      }
    };

    fetchLikes();
  }, [imageId, user]);

  const toggleLike = async () => {
    if (!user) return alert("Login required.");
    if (liked) {
      await supabase.from("likes").delete().match({ image_id: imageId, user_id: user.id });
    } else {
      await supabase.from("likes").insert({ image_id: imageId, user_id: user.id });
    }
    setLiked(!liked);
    setCount((c) => (liked ? c - 1 : c + 1));
  };

  return (
    <button onClick={toggleLike}>
      {liked ? "💖" : "🤍"} {count}
    </button>
  );
};
