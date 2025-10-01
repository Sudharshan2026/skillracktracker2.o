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
    const { stats } = profileData;
    return {
      codeTrack: stats.codeTrack * 2,      // 2 points each - Requirement 6.1
      codeTutor: stats.codeTutor * 0,      // 0 points each - Requirement 6.2
      dailyTest: stats.dailyTest * 20,     // 20 points each - Requirement 6.3
      dailyChallenge: stats.dailyChallenge * 2, // 2 points each - Requirement 6.4
      codeTest: stats.codeTest * 30,       // 30 points each - Requirement 6.5
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
      
      {/* Profile Information Section */}
      <div className="profile-info">
        <div className="profile-header">
          {profileData.profileImage && (
            <img 
              src={profileData.profileImage} 
              alt="Profile" 
              className="profile-image"
            />
          )}
          <div className="profile-details">
            <h3 className="profile-name">{profileData.name}</h3>
            <div className="profile-id">ID: {profileData.id}</div>
            <div className="profile-education">
              <span className="department">{profileData.department}</span>
              {profileData.college && (
                <>
                  <span className="divider">•</span>
                  <span className="college">{profileData.college}</span>
                </>
              )}
              {profileData.year && (
                <>
                  <span className="divider">•</span>
                  <span className="year">{profileData.year}</span>
                </>
              )}
            </div>
            {profileData.gender && (
              <div className="profile-gender">{profileData.gender}</div>
            )}
          </div>
        </div>
        
        {/* Additional Stats */}
        <div className="additional-stats">
          <div className="stat-item">
            <span className="stat-label">Rank:</span>
            <span className="stat-value">{formatCount(profileData.stats.rank)}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Level:</span>
            <span className="stat-value">{formatCount(profileData.stats.level)}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">🥇:</span>
            <span className="stat-value">{formatCount(profileData.stats.gold)}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">🥈:</span>
            <span className="stat-value">{formatCount(profileData.stats.silver)}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">🥉:</span>
            <span className="stat-value">{formatCount(profileData.stats.bronze)}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Total Problems:</span>
            <span className="stat-value">{formatCount(profileData.stats.programsSolved)}</span>
          </div>
        </div>
      </div>
      
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
                {formatCount(profileData.stats.codeTrack)}
              </td>
              <td className="calculation">
                {formatCount(profileData.stats.codeTrack)} × 2 = {formatPoints(categoryPoints.codeTrack)}
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
                {formatCount(profileData.stats.codeTest)}
              </td>
              <td className="calculation">
                {formatCount(profileData.stats.codeTest)} × 30 = {formatPoints(categoryPoints.codeTest)}
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
                {formatCount(profileData.stats.dailyTest)}
              </td>
              <td className="calculation">
                {formatCount(profileData.stats.dailyTest)} × 20 = {formatPoints(categoryPoints.dailyTest)}
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
                {formatCount(profileData.stats.dailyChallenge)}
              </td>
              <td className="calculation">
                {formatCount(profileData.stats.dailyChallenge)} × 2 = {formatPoints(categoryPoints.dailyChallenge)}
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
                {formatCount(profileData.stats.codeTutor)}
              </td>
              <td className="calculation">
                {formatCount(profileData.stats.codeTutor)} × 0 = 0
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
            {formatPoints(profileData.stats.totalPoints)}
          </div>
          {/* <div className="points-breakdown">
            <span>Code Track: {formatPoints(categoryPoints.codeTrack)}</span>
            <span>Code Test: {formatPoints(categoryPoints.codeTest)}</span>
            <span>Daily Test: {formatPoints(categoryPoints.dailyTest)}</span>
            <span>Daily Challenge: {formatPoints(categoryPoints.dailyChallenge)}</span>
          </div> */}
        </div>
      </div>

      {/* Zero Values Message - Requirement 1.3 */}
      {profileData.stats.totalPoints === 0 && (
        <div className="zero-stats-message">
          <p>
            <strong>No points found in your profile.</strong>
          </p>
          <p>
            Start solving problems on SkillRack to see your statistics here!
          </p>
        </div>
      )}

      {/* Programming Languages Section */}
      {Object.keys(profileData.languages).length > 0 && (
        <div className="languages-section">
          <h4>Programming Languages</h4>
          <div className="languages-grid">
            {Object.entries(profileData.languages).map(([language, count]) => (
              <div key={language} className="language-item">
                <span className="language-name">{language}</span>
                <span className="language-count">{formatCount(count)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certificates Section */}
      {profileData.certificates.length > 0 && (
        <div className="certificates-section">
          <h4>Certificates ({profileData.certificates.length})</h4>
          <div className="certificates-list">
            {profileData.certificates.map((cert, index) => (
              <div key={index} className="certificate-item">
                <div className="certificate-title">{cert.title}</div>
                {cert.date && <div className="certificate-date">{cert.date}</div>}
                {cert.link && (
                  <a 
                    href={cert.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="certificate-link"
                  >
                    View Certificate
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Achievement Highlights */}
      {profileData.stats.totalPoints > 0 && (
        <div className="achievement-highlights">
          <h4>Quick Stats</h4>
          <div className="highlight-grid">
            <div className="highlight-item">
              <span className="highlight-number">{formatCount(profileData.stats.codeTrack + profileData.stats.codeTest + profileData.stats.dailyTest + profileData.stats.dailyChallenge)}</span>
              <span className="highlight-label">Total Problems</span>
            </div>
            <div className="highlight-item">
              <span className="highlight-number">{formatCount(Math.max(profileData.stats.codeTrack, profileData.stats.codeTest, profileData.stats.dailyTest, profileData.stats.dailyChallenge))}</span>
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