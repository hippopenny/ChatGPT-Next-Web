"use client";
import { Analytics } from "@vercel/analytics/react";

import { Home } from "./components/home";

import { getServerSideConfig } from "./config/server";
import "./components/hippo/custom-style-web.scss";
import { HandleLinkToOath, CheckUser } from "./components/hippo/handllogin";
const serverConfig = getServerSideConfig();

export default async function App() {
  return (
    <>
      {/* hippo penny handle auth */}
      <HandleLinkToOath />
      <CheckUser />

      {/* hippo penny handle auth */}

      <Home />
      {serverConfig?.isVercel && (
        <>
          <Analytics />
        </>
      )}
    </>
  );
}
