// components/CommentSection.tsx
import { useEffect, useState } from "react";
import supabase from "../lib/supabaseClient";

export const CommentSection = ({ imageId }: { imageId: string }) => {
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");

  const fetchComments = async () => {
    const { data } = await supabase
      .from("comments")
      .select("*")
      .eq("image_id", imageId)
      .order("created_at", { ascending: false });

    setComments(data || []);
  };

  const handleComment = async () => {
    if (newComment.trim().length < 3) return;

    const user = supabase.auth.user();
    if (!user) return alert("Please log in.");

    await supabase.from("comments").insert({
      image_id: imageId,
      user_id: user.id,
      content: newComment,
    });

    setNewComment("");
    fetchComments();
  };

  useEffect(() => {
    fetchComments();
  }, [imageId]);

  return (
    <div>
      <h3>Comments</h3>
      <div>
        {comments.map((c) => (
          <p key={c.id}>
            <strong>{c.user_id.slice(0, 6)}:</strong> {c.content}
          </p>
        ))}
      </div>
      <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} />
      <button onClick={handleComment}>Submit</button>
    </div>
  );
};
