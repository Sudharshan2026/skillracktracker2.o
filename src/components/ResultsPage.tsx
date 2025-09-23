import { StatsDisplay, GoalCalculator, ResultsDisplay } from './index';
import type { ProfileStats, GoalCalculation } from '../types';
import './ResultsPage.css';

/**
 * Props for the ResultsPage component
 */
export interface ResultsPageProps {
  /** Parsed profile statistics to display */
  profileData: ProfileStats;
  
  /** The profile URL that was analyzed */
  analyzedUrl: string;
  
  /** Goal calculation results (if any) */
  goalResults: GoalCalculation | null;
  
  /** Callback function when goal calculation is requested */
  onCalculateGoal: (targetPoints: number, timelineDays: number) => void;
  
  /** Callback to navigate back to home page */
  onGoHome: () => void;
}

/**
 * ResultsPage component - Dedicated page for displaying profile analysis results
 * Implements requirements 8.2, 8.3, 8.4, 8.5, 4.2, 4.3
 */
export function ResultsPage({ 
  profileData, 
  analyzedUrl, 
  goalResults,
  onCalculateGoal,
  onGoHome 
}: ResultsPageProps) {
  return (
    <div className="results-page">
      <header className="results-header">
        <div className="header-content">
          <h1>Profile Analysis Results</h1>
          <button 
            onClick={onGoHome}
            className="home-button"
            type="button"
          >
            ← New Analysis
          </button>
        </div>
        
        {/* Display analyzed URL - Requirement 8.4 */}
        <div className="analyzed-url-section">
          <label className="url-label">SkillRack Profile URL:</label>
          <div className="url-display">
            <a 
              href={analyzedUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="profile-link"
            >
              {analyzedUrl}
            </a>
          </div>
        </div>
      </header>

      <main className="results-main">
        {/* SkillRack-inspired layout - Requirements 8.3, 4.3 */}
        <div className="results-grid">
          {/* Profile Statistics Section */}
          <section className="profile-section">
            <div className="section-header">
              <h2>Profile Statistics</h2>
            </div>
            <div className="profile-card">
              <StatsDisplay profileData={profileData} />
            </div>
          </section>

          {/* Goal Calculator Section */}
          <section className="goal-section">
            <div className="section-header">
              <h2>Goal Planning</h2>
            </div>
            <div className="goal-card">
              <GoalCalculator 
                currentPoints={profileData.totalPoints}
                onCalculate={onCalculateGoal}
              />
            </div>
          </section>
        </div>

        {/* Results Display Section */}
        {goalResults && (
          <section className="goal-results-section">
            <div className="section-header">
              <h2>Achievement Plan</h2>
            </div>
            <div className="results-card">
              <ResultsDisplay goalResults={goalResults} />
            </div>
          </section>
        )}
      </main>

      <footer className="results-footer">
        <div className="footer-content">
          <p>
            Analysis completed. No data has been stored.
          </p>
          <button 
            onClick={onGoHome}
            className="footer-home-button"
            type="button"
          >
            Start New Analysis
          </button>
        </div>
      </footer>
    </div>
  );
}