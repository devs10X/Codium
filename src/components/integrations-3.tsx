import { OpenAI, Google, Sandbox, Tailwindcss, Shadcn, Prisma } from '@/components/logos'
import { LogoIcon } from '@/components/logo'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import GitHub from './logos/GitHub'

export default function IntegrationsSection() {
    return (
        <section>
            <div className="bg-muted dark:bg-background py-5 md:py-10">
                <div className="mx-auto max-w-5xl px-6">
                <div className="text-center mb-5">
                    <h2 className="text-balance text-4xl font-semibold lg:text-5xl">Built With</h2>
                    <p className="mt-4">Connect GitHub, Google,and more to work smarter and faster with AI.</p>
                </div>
                    <div className="grid items-center sm:grid-cols-2">
                        <div className="dark:bg-muted/50 relative mx-auto w-fit">
                            <div className="bg-radial to-muted dark:to-background absolute inset-0 z-10 from-transparent to-75%"></div>
                            <div className="mx-auto mb-2 flex w-fit justify-center gap-2">
                                <IntegrationCard>
                                    <GitHub/>
                                </IntegrationCard>
                                <IntegrationCard>
                                    <Google />
                                </IntegrationCard>
                            </div>
                            <div className="mx-auto my-2 flex w-fit justify-center gap-2">
                                <IntegrationCard>
                                    <Sandbox />
                                </IntegrationCard>
                                <IntegrationCard
                                    borderClassName="shadow-black-950/10 shadow-xl border-black/25 dark:border-white/25"
                                    className="dark:bg-white/10">
                                     <OpenAI />
                                </IntegrationCard>
                                <IntegrationCard>
                                    <Prisma/>
                                </IntegrationCard>
                            </div>

                            <div className="mx-auto flex w-fit justify-center gap-2">
                                <IntegrationCard>
                                    <Tailwindcss />
                                </IntegrationCard>

                                <IntegrationCard>
                                    <Shadcn />
                                </IntegrationCard>
                            </div>
                        </div>
                        <div className="mx-auto mt-6 max-w-lg space-y-6 text-center sm:mt-0 sm:text-left">
                            <h2 className="text-balance text-3xl font-semibold md:text-4xl">Integrate with your favorite tools</h2>
                            <p className="text-muted-foreground">Supercharge your workflow by connecting seamlessly with popular platforms and services.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

const IntegrationCard = ({ children, className, borderClassName }: { children: React.ReactNode; className?: string; borderClassName?: string }) => {
    return (
        <div className={cn('bg-background relative flex size-20 rounded-xl dark:bg-transparent', className)}>
            <div
                role="presentation"
                className={cn('absolute inset-0 rounded-xl border border-black/20 dark:border-white/25', borderClassName)}
            />
            <div className="relative z-20 m-auto size-fit *:size-8">{children}</div>
        </div>
    )
}
