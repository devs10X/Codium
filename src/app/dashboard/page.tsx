import { Chat } from "@/components/chat";
import { Sandbox } from "@/components/sandbox";

export default function Dashboard() {
    return (
        <>
        <h1 className="text-2xl font-bold border-b p-2">Codium</h1>
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