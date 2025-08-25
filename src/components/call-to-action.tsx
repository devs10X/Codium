"use client"
import { redirect } from 'next/navigation';
import { ShimmerButton } from './magicui/shimmer-button'
import { signIn, useSession } from 'next-auth/react';

export default function CallToAction() {
    const {status} = useSession();
    return (
        <section className="py-16 md:py-32">
            <div className="mx-auto max-w-5xl px-6">
                <div className="text-center">
                    <h2 className="text-balance text-4xl font-semibold lg:text-5xl">Start Building</h2>
                    <p className="mt-4">Libero sapiente aliquam quibusdam aspernatur.</p>

                    <div className="mt-12 flex flex-wrap justify-center gap-4">
                            <ShimmerButton className="shadow-2xl" onClick={async() => {
                                status == "authenticated" ? redirect('/dashboard') : await signIn();
                            }}>
                                <span className='text-white'>Get Started</span>
                            </ShimmerButton>

                    </div>
                </div>
            </div>
        </section>
    )
}
