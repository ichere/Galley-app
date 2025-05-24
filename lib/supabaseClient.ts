
import { createClient } from "../node_modules/@supabase/supabase-js/dist/module/index";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'YOUR_SUPABASE_URL';  //  Use environment variables!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY'; //  Use environment variables!

if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase URL and Key are required!  Set them in your environment variables.");
}
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;