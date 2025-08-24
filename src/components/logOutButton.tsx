"use client"
import { signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { redirect } from "next/navigation";

export function LogOutButton(){
    const {data : session } = useSession();

    return (
        <>
        <Button onClick={async () => {
            await signOut();
            redirect('/');
        }} 
        >Log Out</Button>
        </>
    )
}