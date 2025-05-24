import supabase from "../../lib/supabaseClient";

// /pages/api/likes.ts
export default async function handler(req, res) {
  const { image_id, user } = req.body;
  const { data } = await supabase
    .from('likes')
    .select('*')
    .eq('image_id', image_id)
    .eq('user', user);

  if (data.length > 0) {
    await supabase.from('likes').delete().match({ image_id, user });
    res.json({ liked: false });
  } else {
    await supabase.from('likes').insert([{ image_id, user }]);
    res.json({ liked: true });
  }
}
