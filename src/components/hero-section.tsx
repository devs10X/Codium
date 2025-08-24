"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { TextEffect } from '@/components/ui/text-effect'
import { AnimatedGroup } from '@/components/ui/animated-group'
import { HeroHeader } from './header'
import { TypewriterEffectSmooth } from './ui/typewriter-effect'
import { Highlight } from './ui/hero-highlight'
import { motion } from "framer-motion";
import { RainbowButton } from './magicui/rainbow-button'
import { signIn, useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import Features from './features-1'
import IntegrationsSection from './integrations-3'
import FooterSection from './footer'


const transitionVariants : any = {
  item: {
    hidden: {
      opacity: 0,
      y: 12,
      style: { filter: 'blur(12px)' },
    },
    visible: {
      opacity: 1,
      y: 0,
      style: { filter: 'blur(0px)' },
      transition: {
        type: 'spring',
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
};


export default function HeroSection() {
    const words = [
    {
      text: "Build",
    },
    {
      text: "to",
    },
    {
      text: "generate,",
    },
    {
      text: "test,",
    },
    {
      text: "and",
    },
    {
      text: "debug",
    },
    {
      text: "automatically,",
    },
    {
      text: "Codium,",
    },
    {
      text: "is",
    },
        {
      text: "the",
    },
    {
      text: "fastest,",
    },
    {
      text: "way",
    },
    {
      text: "to",
    },
       {
      text: "code,",
    },
    {
      text: "with",
    },
    {
      text: "AI.",
    },
  ];

  const {status} = useSession();

    return (
        <>
            <HeroHeader />
            <main className="overflow-hidden">
                <div
                    aria-hidden
                    className="absolute inset-0 isolate hidden opacity-65 contain-strict lg:block">
                    <div className="w-140 h-320 -translate-y-87.5 absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
                    <div className="h-320 absolute left-0 top-0 w-60 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
                    <div className="h-320 -translate-y-87.5 absolute left-0 top-0 w-60 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]" />
                </div>
                <section id="about">
                    <div className="relative pt-24 md:pt-36">
                        <div className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--color-background)_75%)]"></div>
                        <div className="mx-auto max-w-7xl px-6">
                            <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
                                <AnimatedGroup variants={transitionVariants}>
                                    <Link
                                        href="#link"
                                        className="hover:bg-background dark:hover:border-t-border bg-muted group mx-auto flex w-fit items-center gap-4 rounded-full border p-1 pl-4 shadow-md shadow-zinc-950/5 transition-colors duration-300 dark:border-t-white/5 dark:shadow-zinc-950">
                                        <span className="text-foreground text-sm">Introducing Support for AI Models</span>
                                        <span className="dark:border-background block h-4 w-0.5 border-l bg-white dark:bg-zinc-700"></span>

                                        <div className="bg-background group-hover:bg-muted size-6 overflow-hidden rounded-full duration-500">
                                            <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                                                <span className="flex size-6">
                                                    <ArrowRight className="m-auto size-3" />
                                                </span>
                                                <span className="flex size-6">
                                                    <ArrowRight className="m-auto size-3" />
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                </AnimatedGroup>

                                <TextEffect
                                    preset="fade-in-blur"
                                    speedSegment={0.3}
                                    as="h1"
                                    className="mt-8 text-balance text-3xl md:text-5xl lg:mt-16 xl:text-[5.25rem]">
                                     The AI Code Agent
                                </TextEffect>

                                <div className='flex justify-center hidden sm:flex'>
                                    <TypewriterEffectSmooth words={words} className='text-sm ' />
                                </div>

                                <div className="flex justify-center sm:hidden flex-nowrap text-[8px] sm:text-base md:text-xl lg:text-2xl mt-4">
                                  <motion.span
                                    initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                >
                                    <span className="whitespace-nowrap">
                                    Built to generate, test, and debug automatically,
                                    <Highlight className="text-black dark:text-white inline-flex ml-1">
                                        Codium is the fastest way to code with AI.
                                    </Highlight>
                                </span>
                                </motion.span>
                                </div>

                                <AnimatedGroup
                                    variants={{
                                        container: {
                                            visible: {
                                                transition: {
                                                    staggerChildren: 0.05,
                                                    delayChildren: 0.75,
                                                },
                                            },
                                        },
                                        ...transitionVariants,
                                    }}
                                    className="mt-5 flex flex-col items-center justify-center gap-2 md:flex-row">
                                    <div
                                        key={1}
                                        className="bg-foreground/10 rounded-[calc(var(--radius-xl)+0.125rem)] border p-0.5">
                                                <RainbowButton className="rounded-xl px-5 text-base"
                                                onClick={async() => {
                                                    status == "authenticated" ? redirect('/dashboard') : await signIn();
                                                }}>
                                                     {status == "authenticated" ? "Dashboard" : "Start Building"}
                                                </RainbowButton>
                                    </div>
                                </AnimatedGroup>
                            </div>
                        </div>

                        <AnimatedGroup
                            variants={{
                                container: {
                                    visible: {
                                        transition: {
                                            staggerChildren: 0.05,
                                            delayChildren: 0.75,
                                        },
                                    },
                                },
                                ...transitionVariants,
                            }}>
                            <div className="relative -mr-56 mt-8 overflow-hidden px-2 sm:mr-0 sm:mt-12 md:mt-20">
                                <div
                                    aria-hidden
                                    className="bg-linear-to-b to-background absolute inset-0 z-10 from-transparent from-35%"
                                />
                                <div className="inset-shadow-2xs ring-background dark:inset-shadow-white/20 bg-background relative mx-auto max-w-6xl overflow-hidden rounded-2xl border p-4 shadow-lg shadow-zinc-950/15 ring-1">
                                    <Image
                                        className="bg-background aspect-15/8 relative hidden rounded-2xl dark:block"
                                        src="/mail2.png"
                                        alt="app screen"
                                        width="2700"
                                        height="1440"
                                    />
                                    <Image
                                        className="z-2 border-border/25 aspect-15/8 relative rounded-2xl border dark:hidden"
                                        src="/mail2-light.png"
                                        alt="app screen"
                                        width="2700"
                                        height="1440"
                                    />
                                </div>
                            </div>
                        </AnimatedGroup>
                    </div>
                </section>

            <section id='features'>
                <div>
                        <Features/>
                </div>
            </section>
            

                <div>
                    <IntegrationsSection/>
                </div>
        </main>

        <section id='tools'>
            <div className='max-w-10xl border-t mt-20'>
                    <FooterSection/>
            </div>
        </section>
        </>
    )
}
