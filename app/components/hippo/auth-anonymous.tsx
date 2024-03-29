"use client";

import { useEffect } from "react";
import { supabase } from "./supabase";

export default function AuthAnonymous() {
  /**
   * Create Anonymous User
   */
  const handleCreateAnonymousUser = async () => {
    let { data: DataUser, error: errorUser } = await supabase.auth.getUser();
    if (DataUser.user === null) {
      await supabase.auth.signInAnonymously();
      const { data: dataUser, error: errorUser } =
        await supabase.auth.getUser();
      console.log("data users::", dataUser);
    } else {
      //   await supabase.auth.updateUser({
      //     email: "tronghuy0077123@gmail.com",
      //   });
      const { data: dataUser, error: errorUser } =
        await supabase.auth.getUser();
      console.log("data users::", dataUser);
    }
  };
  useEffect(() => {
    handleCreateAnonymousUser();
  }, []);
}
