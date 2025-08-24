import { Chat } from "@/components/chat";

export default function Dashboard() {
    return (
        <div className="w-screen h-screen grid grid-cols-10">
            <div className="col-span-3">
                <Chat />
            </div>
            <div className="col-span-7"></div>
        </div>
    )
}