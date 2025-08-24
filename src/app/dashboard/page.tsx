"use client"

import { Chat } from "@/components/chat";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Sandbox } from "@/components/sandbox";
import { Appbar } from "@/components/appbar";


export default function Dashboard() {
    const {data : session, status } = useSession();
    if(status == "unauthenticated"){
        redirect('/');
    }

    return (
        <>
        <Appbar />
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