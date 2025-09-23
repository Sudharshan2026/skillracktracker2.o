import React from 'react';
import type { StatsDisplayProps } from '../types';
import './StatsDisplay.css';

/**
 * StatsDisplay component for showing parsed profile statistics
 * Implements requirements 1.2, 1.3, 4.2, 4.3
 */
const StatsDisplay: React.FC<StatsDisplayProps> = ({ profileData }) => {
  /**
   * Calculates points for each category based on SkillRack scoring
   * Requirements 6.1-6.6: Accurate point calculations
   */
  const calculateCategoryPoints = () => {
    return {
      codeTrack: profileData.codeTrack * 2,      // 2 points each - Requirement 6.1
      codeTutor: profileData.codeTutor * 0,      // 0 points each - Requirement 6.2
      dailyTest: profileData.dailyTest * 20,     // 20 points each - Requirement 6.3
      dailyChallenge: profileData.dailyChallenge * 2, // 2 points each - Requirement 6.4
      codeTest: profileData.codeTest * 30,       // 30 points each - Requirement 6.5
    };
  };

  const categoryPoints = calculateCategoryPoints();

  /**
   * Formats numbers with proper handling of zero values
   * Requirement 1.3: Handle zero values and missing data appropriately
   */
  const formatCount = (count: number): string => {
    return count === 0 ? '0' : count.toLocaleString();
  };

  const formatPoints = (points: number): string => {
    return points === 0 ? '0' : points.toLocaleString();
  };

  return (
    <div className="stats-display">
      <h2 className="stats-title">Your SkillRack Statistics</h2>
      
      {/* Statistics Table - Requirements 1.2, 4.2 */}
      <div className="stats-table-container">
        <table className="stats-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Problems Solved</th>
              <th>Points Calculation</th>
              <th>Total Points</th>
            </tr>
          </thead>
          <tbody>
            {/* Code Track Row */}
            <tr className="stats-row">
              <td className="category-name">
                <span className="category-icon">🏃</span>
                Code Track
              </td>
              <td className="problem-count">
                {formatCount(profileData.codeTrack)}
              </td>
              <td className="calculation">
                {formatCount(profileData.codeTrack)} × 2 = {formatPoints(categoryPoints.codeTrack)}
              </td>
              <td className="points">
                {formatPoints(categoryPoints.codeTrack)}
              </td>
            </tr>

            {/* Code Test Row */}
            <tr className="stats-row">
              <td className="category-name">
                <span className="category-icon">📝</span>
                Code Test
              </td>
              <td className="problem-count">
                {formatCount(profileData.codeTest)}
              </td>
              <td className="calculation">
                {formatCount(profileData.codeTest)} × 30 = {formatPoints(categoryPoints.codeTest)}
              </td>
              <td className="points">
                {formatPoints(categoryPoints.codeTest)}
              </td>
            </tr>

            {/* Daily Test Row */}
            <tr className="stats-row">
              <td className="category-name">
                <span className="category-icon">📅</span>
                Daily Test
              </td>
              <td className="problem-count">
                {formatCount(profileData.dailyTest)}
              </td>
              <td className="calculation">
                {formatCount(profileData.dailyTest)} × 20 = {formatPoints(categoryPoints.dailyTest)}
              </td>
              <td className="points">
                {formatPoints(categoryPoints.dailyTest)}
              </td>
            </tr>

            {/* Daily Challenge Row */}
            <tr className="stats-row">
              <td className="category-name">
                <span className="category-icon">⚡</span>
                Daily Challenge
              </td>
              <td className="problem-count">
                {formatCount(profileData.dailyChallenge)}
              </td>
              <td className="calculation">
                {formatCount(profileData.dailyChallenge)} × 2 = {formatPoints(categoryPoints.dailyChallenge)}
              </td>
              <td className="points">
                {formatPoints(categoryPoints.dailyChallenge)}
              </td>
            </tr>

            {/* Code Tutor Row (0 points but displayed) */}
            <tr className="stats-row code-tutor-row">
              <td className="category-name">
                <span className="category-icon">👨‍🏫</span>
                Code Tutor
              </td>
              <td className="problem-count">
                {formatCount(profileData.codeTutor)}
              </td>
              <td className="calculation">
                {formatCount(profileData.codeTutor)} × 0 = 0
                <span className="no-points-note">(No points)</span>
              </td>
              <td className="points">
                0
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Total Points Display - Requirements 1.3, 4.3 */}
      <div className="total-points-section">
        <div className="total-points-card">
          <h3 className="total-label">Total Points</h3>
          <div className="total-points">
            {formatPoints(profileData.totalPoints)}
          </div>
          <div className="points-breakdown">
            <span>Code Track: {formatPoints(categoryPoints.codeTrack)}</span>
            <span>Code Test: {formatPoints(categoryPoints.codeTest)}</span>
            <span>Daily Test: {formatPoints(categoryPoints.dailyTest)}</span>
            <span>Daily Challenge: {formatPoints(categoryPoints.dailyChallenge)}</span>
          </div>
        </div>
      </div>

      {/* Zero Values Message - Requirement 1.3 */}
      {profileData.totalPoints === 0 && (
        <div className="zero-stats-message">
          <p>
            <strong>No points found in your profile.</strong>
          </p>
          <p>
            Start solving problems on SkillRack to see your statistics here!
          </p>
        </div>
      )}

      {/* Achievement Highlights */}
      {profileData.totalPoints > 0 && (
        <div className="achievement-highlights">
          <h4>Quick Stats</h4>
          <div className="highlight-grid">
            <div className="highlight-item">
              <span className="highlight-number">{formatCount(profileData.codeTrack + profileData.codeTest + profileData.dailyTest + profileData.dailyChallenge)}</span>
              <span className="highlight-label">Total Problems</span>
            </div>
            <div className="highlight-item">
              <span className="highlight-number">{formatCount(Math.max(profileData.codeTrack, profileData.codeTest, profileData.dailyTest, profileData.dailyChallenge))}</span>
              <span className="highlight-label">Best Category</span>
            </div>
            <div className="highlight-item">
              <span className="highlight-number">{formatPoints(Math.max(categoryPoints.codeTrack, categoryPoints.codeTest, categoryPoints.dailyTest, categoryPoints.dailyChallenge))}</span>
              <span className="highlight-label">Top Points</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatsDisplay;