import Image from 'next/image'
import { type SVGProps } from 'react'

export default function Replit(props: SVGProps<SVGSVGElement>) {
    return (
        <Image src="/shadcn.png" width={30} height={30} alt="sandbox" />
    )
}
