import React from 'react';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import ThemeToggle from './ThemeToggle';

export interface ResultsHeaderProps {
  analyzedUrl: string;
  onGoHome: () => void;
  showPlan?: boolean;
  onLogout?: () => void;
}

export function ResultsHeader({ analyzedUrl, onGoHome, showPlan = false, onLogout }: ResultsHeaderProps) {
  const links = [
    { label: 'Statistics', href: '#stats' },
    { label: 'Goal Planning', href: '#goals' },
    ...(showPlan ? [{ label: 'Plan', href: '#plan' }] : []),
  ];

  const [active, setActive] = React.useState<string>('#stats');

  React.useEffect(() => {
    const sectionIds = ['#stats', '#goals'].concat(showPlan ? ['#plan'] : []);
    const sections = sectionIds
      .map(id => document.querySelector(id) as HTMLElement | null)
      .filter(Boolean) as HTMLElement[];

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) {
          setActive(`#${visible.target.id}`);
        }
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: [0.1, 0.25, 0.5, 0.75] }
    );

    sections.forEach(sec => observer.observe(sec));
    return () => observer.disconnect();
  }, [showPlan]);

  return (
    <header className="sticky top-4 z-50 w-full" data-testid="results-header">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between rounded-lg border bg-background/90 px-4 py-3 shadow backdrop-blur supports-[backdrop-filter]:bg-background/80">
        {/* Left: Brand/Back */}
        <div className="flex items-center shrink-0">
          <Button variant="outline" size="sm" onClick={onGoHome}>
            SkillRack Tracker
          </Button>
        </div>

        {/* Center: Section links (always visible, scrollable on small screens) */}
        <nav className="flex items-center gap-x-2 overflow-x-auto mx-4">
          {links.map((link) => (
            <a
              key={link.href}
              className={cn(
                buttonVariants({ variant: 'ghost', size: 'sm' }),
                active === link.href && 'bg-accent text-accent-foreground',
                'px-6 whitespace-nowrap'
              )}
              href={link.href}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right: Logout */}
        <div className="flex items-center justify-end gap-3 shrink-0">
          <ThemeToggle />
          <button
            className={buttonVariants({ variant: 'ghost', size: 'sm' })}
            onClick={onLogout ?? onGoHome}
            type="button"
            title="Logout"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

export default ResultsHeader;


