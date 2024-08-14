import { createClient } from '@/utils/supabase/server';

//TODO Add list of approved feedback from users

export default async function Notes() {
  const supabase = createClient();
  const { data: notes } = (await supabase.from("notes").select());

  return <pre>{JSON.stringify(notes, null, 2)}</pre>
}