"use client";

import { useEffect } from "react";
import { supabase } from "./supabase";

export default function Auth() {
  useEffect(() => {}, []);
  const handleOauthFB = async () => {
    const { data, error } = await supabase.auth.linkIdentity({
      provider: "facebook",
    });
    console.log("data oauth:::", data);
  };
  const handleOauthGitHub = async () => {
    const { data, error } = await supabase.auth.linkIdentity({
      provider: "github",
    });
    console.log("data oauth:::", data);
  };

  return (
    <>
      <button className="authSocial" onClick={() => handleOauthFB()}>
        Sign in facebook
      </button>
      <button className="authSocial" onClick={() => handleOauthGitHub()}>
        Sign in github
      </button>
    </>
  );
}
