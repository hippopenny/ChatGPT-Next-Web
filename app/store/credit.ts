import { supabase } from "../components/hippo/supabase";
import { StoreKey } from "../constant";
import { createPersistStore } from "../utils/store";

export const useCreditStore = createPersistStore(
  { credit: 5 },
  (set, get) => ({
    async fetchCredit(userId: string, isAnonymous?: boolean) {
      console.log("userId", userId);
      let { data: creditQuery, error } = await supabase
        .from("credits")
        .select("*")
        .eq("id", userId);
      if (creditQuery?.length === 0) {
        this.upsertCredit(userId, isAnonymous ? 5 : 200);
      } else {
        console.log("creditQuery", creditQuery);
        set(() => ({
          credit: creditQuery ? creditQuery[0]?.credit : 5,
        }));
      }
    },

    async upsertCredit(userId: string, creditNumber?: number) {
      let { data: creditUpsert, error } = await supabase
        .from("credits")
        .upsert([
          {
            id: userId,
            credit: creditNumber,
          },
        ])
        .select();
      console.log("creditUpsert", creditUpsert);
      set(() => ({
        credit: creditUpsert ? creditUpsert[0]?.credit : creditNumber,
      }));
    },

    subcribe(userId: string) {
      console.log("userId", userId);
      return supabase
        .channel("subcribe-credit")
        .on(
          "postgres_changes",
          {
            event: "UPDATE",
            schema: "public",
            table: "credits",
            filter: `id=eq.${userId}`,
          },
          (payload) => {
            console.log("Change received!", payload);
            set(() => ({
              credit: payload ? payload.new.credit : 5,
            }));
          },
        )
        .subscribe();
    },
    unsubcribe(channel: any) {
      supabase.removeChannel(channel);
    },
  }),
  {
    name: StoreKey.Credit,
    version: 1,
  },
);
