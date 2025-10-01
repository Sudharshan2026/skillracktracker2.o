import { FloatingHeader } from "@/components/ui/floating-header";
import { cn } from '@/lib/utils';

/**
 * Demo component showing how to use the FloatingHeader
 * This demonstrates the floating header with background dots pattern
 */
export default function FloatingHeaderDemo() {
  return (
    <div className="relative w-full px-4">
      <FloatingHeader 
        onNavigateHome={() => console.log('Navigate to Home')}
        onNavigateToTracker={() => console.log('Navigate to Tracker')}
        onNavigateToGoals={() => console.log('Navigate to Goals')}
        currentPage="home"
      />
      
      {/* Demo content with minimum height to show scrolling */}
      <div className="min-h-screen py-10">
        <div className="max-w-4xl mx-auto space-y-8">
          <section className="text-center">
            <h1 className="text-4xl font-bold mb-4">SkillRack Tracker</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Track your progress, analyze your stats, and plan your goals
            </p>
          </section>
          
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-card border rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Profile Analysis</h3>
              <p className="text-muted-foreground">
                Get detailed insights into your SkillRack performance and progress
              </p>
            </div>
            <div className="p-6 bg-card border rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Goal Planning</h3>
              <p className="text-muted-foreground">
                Set targets and calculate the optimal path to achieve them
              </p>
            </div>
            <div className="p-6 bg-card border rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Progress Tracking</h3>
              <p className="text-muted-foreground">
                Monitor your advancement and stay motivated with clear metrics
              </p>
            </div>
          </section>
          
          <section className="py-20">
            <h2 className="text-2xl font-bold text-center mb-8">Try the Navigation</h2>
            <p className="text-center text-muted-foreground">
              Use the floating header above to navigate between different sections
            </p>
          </section>
        </div>
      </div>

      {/* Background dots pattern */}
      <div
        aria-hidden="true"
        className={cn(
          'absolute inset-0 -z-10 size-full',
          'bg-[radial-gradient(color-mix(in_oklab,theme(colors.foreground/.05),transparent)_2px,transparent_2px)]',
          'bg-[size:12px_12px]',
        )}
      />
    </div>
  );
}