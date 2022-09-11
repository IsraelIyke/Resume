import { useState, useEffect } from "react";
import Account from "./Account";
import Login from "./login";
// import Register from "./register";
import { supabase } from "../client";

export default function Auth() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  return (
    <>
      {!session ? (
        <Login />
      ) : (
        <Account key={session.user.id} session={session} />
      )}
    </>
  );
}
