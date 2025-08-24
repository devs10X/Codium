"use client"

import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Home() {
  const {data: session, status} = useSession();
  
  return (
   <div>
          <Button onClick={async () => {
            status == "authenticated" ? redirect('/dashboard') : await signIn();
          }} >{status == "authenticated" ? "Dashboard" : "Sign in"}</Button>

   </div>
  );
}
