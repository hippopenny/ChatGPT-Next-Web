"use client";

import { useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

export default function Auth() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
  );
  const signInAnonymously = async () => {
    try {
    } catch (error) {
      console.error("Error signing in anonymously:", error);
    }
  };

  // idUser in DB ? "" : save(user)
  useEffect(() => {
    signInAnonymously();
    // supabaseData();
  }, []);

  // when login: social in user ? "" : add social to user

  return (
    <>
      <button className="authSocial">Sign in with facebook</button>
    </>
  );
}
