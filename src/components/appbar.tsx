import { LogOutButton } from "@/components/logOutButton";
import Image from "next/image";

export function Appbar(){
    return(
        <div className="flex justify-between border-b p-2 px-6 items-center">
            <h1 className="text-2xl font-bold flex justify-center items-center gap-1"><Image src='/logo.png' width={30} height={30} alt="logo" />Codium</h1>
            <div><LogOutButton/></div>
        </div>
    )
}