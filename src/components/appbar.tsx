import Image from "next/image";
import { AuroraText } from "./magicui/aurora-text";
import UserMenu from "./user-menu-drop-down";
import { redirect } from "next/navigation";

export function Appbar(){
    return(
        <div className="flex justify-between border-b p-2 px-6 items-center">
               <div className='flex justify-center gap-3 cursor-pointer'
               onClick={() => redirect('/')}>
                                <Image src="/logo.png" width={30} height={30} alt="codium Image"/> 
                                <p className='text-2xl font-medium'>
                                    <AuroraText>Codium </AuroraText>
                                </p>
                </div>
            <div>
                <UserMenu/>
            </div>
        </div>
    )
}