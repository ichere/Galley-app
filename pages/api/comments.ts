
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const supabase = createServerSupabaseClient(req, res);
  if (req.method === 'POST') {
    const { image_id, user, comment } = req.body;
    const { data, error } = await supabase
      .from('comments')
      .insert([{ image_id, user, comment }]);
    return res.status(200).json({ data });
  }
  if (req.method === 'GET') {
    const { image_id } = req.query;
    const { data } = await supabase
      .from('comments')
      .select('*')
      .eq('image_id', image_id)
      .order('created_at', { ascending: false });
    return res.status(200).json(data);
  }
}
