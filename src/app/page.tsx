"use client"

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export default function Home() {
  return (
   <div>
          <Button onClick={async () => {
            await signIn();
          }} >Sign in</Button>
   </div>
  );
}
