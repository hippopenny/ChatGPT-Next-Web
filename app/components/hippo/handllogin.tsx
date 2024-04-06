"use client";

import { useEffect } from "react";
import { supabase } from "./supabase";

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

  const handleFlowAuth = async () => {
    let { data: dataUser, error: errorUser } = await supabase.auth.getUser();
    if (dataUser.user === null) {
      await supabase.auth.signInAnonymously();
      let { data: dataUserAnonymous, error: errorUser } =
        await supabase.auth.getUser();
      localStorage.setItem("userId", dataUserAnonymous.id);
      localStorage.setItem("loginUser", "false");
    } else {
      console.log(dataUser);
      if (dataUser.user["is_anonymous"]) {
        localStorage.setItem("loginUser", "false");
      } else {
        localStorage.setItem("loginUser", "true");
      }
      localStorage.setItem("userId", dataUser.id);
    }
  };
  useEffect(() => {
    handleFlowAuth();
  }, []);
  return <></>;
}

export const LogOut = async () => {
  await supabase.auth.signOut();
  localStorage.setItem("loginUser", "false");
  window.location.reload();
};
