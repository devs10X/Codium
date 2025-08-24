"use client"

import { Chat } from "@/components/chat";

import { LogOutButton } from "@/components/logOutButton";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Sandbox } from "@/components/sandbox";


export default function Dashboard() {
    const {data : session, status } = useSession();
    if(status == "unauthenticated"){
        redirect('/');
    }

    return (
        <>
        <div className="flex justify-between border-b p-2 items-center">
            <h1 className="text-2xl font-bold">Codium</h1>
            <div><LogOutButton/></div>
        </div>
        <div className="w-screen h-[calc(100vh-56px)] grid grid-cols-10">
            <div className="col-span-3">
                <Chat />
            </div>

            <div className="col-span-7 p-2">
                <Sandbox />
            </div>
        </div>
        </>
    )
}