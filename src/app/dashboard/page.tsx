"use client"

import { Chat } from "@/components/chat";
import { LogOutButton } from "@/components/logOutButton";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Dashboard() {
    const {data : session, status } = useSession();
    if(status == "unauthenticated"){
        redirect('/');
    }

    return (
        <div className="w-screen h-screen grid grid-cols-10">
            <div className="col-span-3">
                <Chat />
            </div>
            <div className="col-span-7"></div>

            <div><LogOutButton/></div>
        </div>
    )
}