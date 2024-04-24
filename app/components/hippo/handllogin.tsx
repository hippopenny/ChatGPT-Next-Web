"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabase";
import { useCreditStore } from "@/app/store/credit";

/**
 * handle error(link social) -> oauth
 */

export function HandleLinkToOath() {
  const handleLinkToOath = async () => {
    const currentUrl = window.location.href;

    // url when link social error
    const errorUrl =
      "https://art3.hippopenny.com/?error=server_error&error_code=422&error_description=Identity+is+already+linked+to+another+user#error=server_error&error_code=422&error_description=Identity+is+already+linked+to+another+user";

    if (currentUrl === errorUrl) {
      // oauth
      const socialError = localStorage.getItem("socalLoginNow");

      await supabase.auth.signInWithOAuth({ provider: socialError });
    }
  };
  useEffect(() => {
    handleLinkToOath();
  }, []);
  return <></>;
}

export function CheckUser() {
  /**
   * Flow auth  check user ? ""  : authAnonymous
   * set id user to use rag  : localStore
   */

  const [userId, setUserId] = useState<string>("");
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const creditStore = useCreditStore();

  const handleFlowAuth = async () => {
    let { data: dataUser, error: errorUser } = await supabase.auth.getUser();
    console.log("dataUser", dataUser);
    if (dataUser.user === null) {
      await supabase.auth.signInAnonymously();
      let { data: dataUserAnonymous, error: errorUser } =
        await supabase.auth.getUser();
      localStorage.setItem("userId", dataUserAnonymous?.user?.id);
      localStorage.setItem("loginUser", "false");
      setUserId(dataUserAnonymous?.user?.id);
      setIsAnonymous(true);
    } else {
      localStorage.setItem(
        "loginUser",
        dataUser.user.is_anonymous ? "false" : "true",
      );
      localStorage.setItem("userId", dataUser.user.id);
      setUserId(dataUser.user.id);
      setIsAnonymous(dataUser.user.is_anonymous);
    }
  };
  useEffect(() => {
    handleFlowAuth();
  }, []);

  useEffect(() => {
    if (userId) {
      creditStore.fetchCredit(userId, isAnonymous);
    }
  }, [userId]);

  return <></>;
}

export const LogOut = async () => {
  await supabase.auth.signOut();
  localStorage.clear();
  window.location.reload();
};
