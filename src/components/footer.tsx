import { Logo } from '@/components/logo'
import Image from 'next/image'
import Link from 'next/link'

const links = [
    {
        title: 'Features',
        href: '#features',
    },
    {
        title: 'Tools',
        href: '#tools',
    },
    {
        title: 'About',
        href: '#about',
    },
]

export default function FooterSection() {
    return (
        <footer className="py-5 md:py-10">
            <div className="mx-auto max-w-5xl px-6">
                <div className='flex justify-center gap-3'>
                    <Image src="/logo.png" width={30} height={30} alt="codium Image"/> 
                    <p className=' text-2xl'>Codium</p>
                </div>

                <div className="my-8 flex flex-wrap justify-center gap-6 text-sm">
                    {links.map((link, index) => (
                        <Link
                            key={index}
                            href={link.href}
                            className="text-muted-foreground hover:text-primary block duration-150">
                            <span>{link.title}</span>
                        </Link>
                    ))}
                </div>
                <span className="text-muted-foreground block text-center text-sm"> © {new Date().getFullYear()} Codium, All rights reserved</span>
            </div>
        </footer>
    )
}
