// mark as client component
"use client";

// importing necessary functions
import { useSession, signIn, signOut } from "next-auth/react";
import { addUserNextChat, getUserNextChat } from "../../api/hippo/hippofunc";
import { useEffect } from "react";

export default function Auth() {
  const { data: session } = useSession();
  async function handleUserDataBase() {
    const idUser = localStorage.getItem("userId");

    const resultUser = await getUserNextChat(idUser);
    if (resultUser === null) {
      const user = {
        idUser: idUser,
        balanceUser: 100,
      };
      await addUserNextChat(user);
    }
  }

  // idUser in DB ? "" : save(user)
  useEffect(() => {
    handleUserDataBase();
  }, []);

  // when login: social in user ? "" : add social to user
  useEffect(() => {
    addSocial(session);
  }, [session]);

  const addSocial = async (session) => {
    if (session && session.user) {
      const social = session.user.social;
      const idUser = localStorage.getItem("userId");
      const user = await getUserNextChat(idUser);
      const socialUser = user.social;
      if (socialUser && socialUser[social]) {
        return;
      } else {
        const newUser = { ...user, socialUser: { [social]: session } };
        await addUserNextChat(newUser);
      }
    }
  };

  if (session && session.user) {
    if (session.user.email)
      return (
        <>
          <p>User name: {session.user?.name}</p>
          <p>Email: {session.user?.email}</p>
          <button onClick={() => signOut()}>Sign out</button>
        </>
      );
    else {
      return (
        <>
          <p>User name: {session.user?.name}</p>
          <p>Email: null</p>
          <button onClick={() => signOut()}>Sign out</button>
        </>
      );
    }
  }

  return (
    <>
      <button onClick={() => signIn("facebook")}>Sign in with facebook</button>
    </>
  );
}
