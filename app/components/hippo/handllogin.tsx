"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabase";

export function HandleLinkToOath() {
  const handleLinkToOath = async () => {
    const currentUrl = window.location.href;
    const errorUrl =
      "https://art3.hippopenny.com/?error=server_error&error_code=422&error_description=Identity+is+already+linked+to+another+user#error=server_error&error_code=422&error_description=Identity+is+already+linked+to+another+user";

    if (currentUrl === errorUrl) {
      console.log("Trang của bạn đã chuyển hướng đến một URL lỗi.");
      const socialError = localStorage.getItem("socalLoginNow");
      if (socialError === "github") {
        await supabase.auth.signInWithOAuth({ provider: socialError });
      }
    }
  };
  useEffect(() => {
    handleLinkToOath();
  }, []);
  return <></>;
}

export function CheckUser() {
  /**
   * Flow auth
   */

  const handleFlowAuth = async () => {
    let { data: dataUser, error: errorUser } = await supabase.auth.getUser();
    if (dataUser.user === null) {
      await supabase.auth.signInAnonymously();
      let { data: dataUserAnonymous, error: errorUser } =
        await supabase.auth.getUser();
      localStorage.setItem("userId", dataUserAnonymous.id);
      console.log("data users::", dataUserAnonymous);
    } else {
      localStorage.setItem("userId", dataUser.id);
      console.log("data users::", dataUser);
    }
  };
  useEffect(() => {
    handleFlowAuth();
  }, []);
  return <></>;
}
