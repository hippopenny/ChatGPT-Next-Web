import { supabase } from ".././components/hippo/supabase";

export async function getUserCredits(accessCode: string) {
  const user = await supabase.auth.getUser(accessCode);
  const userId = user?.data?.user?.id;

  const { data: credit, error } = await supabase
    .from("credits")
    .select("*")
    .eq("id", userId);

  await supabase
    .from("credits")
    .update({ credit: credit?.at(0)?.credit - 1 })
    .eq("id", userId);

  return credit?.at(0)?.credit - 1;
}
