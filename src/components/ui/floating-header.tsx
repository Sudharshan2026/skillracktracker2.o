import React from 'react';
import { TrendingUpIcon, MenuIcon, HomeIcon, TargetIcon, BarChartIcon } from 'lucide-react';
import { Sheet, SheetContent, SheetFooter } from '@/components/ui/sheet';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FloatingHeaderProps {
    onNavigateHome?: () => void;
    onNavigateToTracker?: () => void;
    onNavigateToGoals?: () => void;
    currentPage?: 'home' | 'results' | 'goals';
}

export function FloatingHeader({ 
    onNavigateHome, 
    onNavigateToTracker, 
    onNavigateToGoals,
    currentPage = 'home'
}: FloatingHeaderProps) {
    const [open, setOpen] = React.useState(false);

    const links = [
        {
            label: 'Home',
            href: '#',
            icon: HomeIcon,
            onClick: onNavigateHome,
            active: currentPage === 'home'
        },
        {
            label: 'Track Progress',
            href: '#',
            icon: BarChartIcon,
            onClick: onNavigateToTracker,
            active: currentPage === 'results'
        },
        {
            label: 'Goal Calculator',
            href: '#',
            icon: TargetIcon,
            onClick: onNavigateToGoals,
            active: currentPage === 'goals'
        },
    ];

    return (
        <header
            className={cn(
                'sticky top-5 z-50',
                'mx-auto w-full max-w-4xl rounded-lg border shadow',
                'bg-background/95 supports-[backdrop-filter]:bg-background/80 backdrop-blur-lg',
            )}
        >
            <nav className="mx-auto flex items-center justify-between p-1.5">
                <div className="hover:bg-accent flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 duration-100"
                     onClick={onNavigateHome}>
                    <TrendingUpIcon className="size-5 text-primary" />
                    <p className="font-mono text-base font-bold">SkillRack Tracker</p>
                </div>
                <div className="hidden items-center gap-1 lg:flex">
                    {links.map((link, index) => {
                        const IconComponent = link.icon;
                        return (
                            <button
                                key={index}
                                className={buttonVariants({ 
                                    variant: link.active ? 'default' : 'ghost', 
                                    size: 'sm' 
                                })}
                                onClick={link.onClick}
                            >
                                <IconComponent className="size-4 mr-2" />
                                {link.label}
                            </button>
                        );
                    })}
                </div>
                <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline">GitHub</Button>
                    <Sheet open={open} onOpenChange={setOpen}>
                        <Button
                            size="icon"
                            variant="outline"
                            onClick={() => setOpen(!open)}
                            className="lg:hidden"
                        >
                            <MenuIcon className="size-4" />
                        </Button>
                        <SheetContent
                            className="bg-background/95 supports-[backdrop-filter]:bg-background/80 gap-0 backdrop-blur-lg"
                            showClose={false}
                            side="left"
                        >
                            <div className="grid gap-y-2 overflow-y-auto px-4 pt-12 pb-5">
                                {links.map((link, index) => {
                                    const IconComponent = link.icon;
                                    return (
                                        <button
                                            key={index}
                                            className={buttonVariants({
                                                variant: link.active ? 'default' : 'ghost',
                                                className: 'justify-start w-full',
                                            })}
                                            onClick={() => {
                                                link.onClick?.();
                                                setOpen(false);
                                            }}
                                        >
                                            <IconComponent className="size-4 mr-2" />
                                            {link.label}
                                        </button>
                                    );
                                })}
                            </div>
                            <SheetFooter>
                                <Button variant="outline" className="w-full">View on GitHub</Button>
                                <Button className="w-full">Get Started</Button>
                            </SheetFooter>
                        </SheetContent>
                    </Sheet>
                </div>
            </nav>
        </header>
    );
}


