import { Auth } from "@supabase/auth-ui-react";
import supabase from "../lib/supabaseClient";

export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto mt-10">
      <Auth supabaseClient={supabase} appearance={{ theme: 'default' }} />
    </div>
  );
}
