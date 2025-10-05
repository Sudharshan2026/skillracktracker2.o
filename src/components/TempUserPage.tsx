import { useState } from 'react';
import type { SkillRackProfile } from '../types';
import './TempUserPage.css';

export function TempUserPage() {
  const [profileUrl, setProfileUrl] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const sampleProfile: SkillRackProfile = {
    profileImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200',
    name: 'John Doe',
    id: 'SEC23AD073',
    department: 'Computer Science',
    college: 'Example Engineering College',
    year: '2023-2027',
    gender: 'Male',
    stats: {
      codeTutor: 45,
      codeTrack: 120,
      codeTest: 8,
      dailyTest: 25,
      dailyChallenge: 30,
      rank: 142,
      level: 12,
      gold: 15,
      silver: 30,
      bronze: 20,
      programsSolved: 250,
      totalPoints: 1100
    },
    languages: {
      'Python': 85,
      'Java': 65,
      'C': 50,
      'C++': 30,
      'JavaScript': 20
    },
    certificates: [
      {
        title: 'Python Programming Mastery',
        date: '2024-03-15',
        link: 'https://skillrack.com/cert/example1'
      },
      {
        title: 'Data Structures Champion',
        date: '2024-02-10',
        link: 'https://skillrack.com/cert/example2'
      }
    ]
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (profileUrl.trim()) {
      setShowPreview(true);
    }
  };

  const handleReset = () => {
    setShowPreview(false);
    setProfileUrl('');
  };

  if (!showPreview) {
    return (
      <div className="temp-user-container">
        <div className="temp-user-card">
          <h1 className="temp-user-title">Preview: Profile URL Input</h1>
          <p className="temp-user-description">
            Enter your SkillRack profile URL to see how your profile data will be displayed
          </p>

          <form onSubmit={handleSubmit} className="temp-user-form">
            <div className="input-group">
              <label htmlFor="profileUrl" className="input-label">
                SkillRack Profile URL
              </label>
              <input
                id="profileUrl"
                type="url"
                value={profileUrl}
                onChange={(e) => setProfileUrl(e.target.value)}
                placeholder="https://www.skillrack.com/faces/resume.xhtml?id=..."
                className="profile-url-input"
                required
              />
            </div>

            <button type="submit" className="submit-button">
              Preview Profile Display
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="temp-user-results">
      <header className="temp-user-header">
        <button onClick={handleReset} className="back-button">
          ← Back
        </button>
        <div className="header-content">
          <h1>Profile Analysis Result</h1>
          <p className="analyzed-url">
            <span className="url-label">Analyzing:</span>
            <span className="url-text">{profileUrl}</span>
          </p>
        </div>
      </header>

      <div className="profile-content">
        <div className="profile-hero">
          <div className="profile-image-container">
            <img
              src={sampleProfile.profileImage}
              alt={sampleProfile.name}
              className="profile-image"
            />
          </div>
          <div className="profile-info">
            <h2 className="profile-name">{sampleProfile.name}</h2>
            <p className="profile-id">{sampleProfile.id}</p>
            <p className="profile-meta">{sampleProfile.department}</p>
            <p className="profile-meta">{sampleProfile.college}</p>
            <p className="profile-meta">Year: {sampleProfile.year}</p>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card highlight-card">
            <div className="stat-icon">🎯</div>
            <div className="stat-value">{sampleProfile.stats.totalPoints}</div>
            <div className="stat-label">Total Points</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-value">{sampleProfile.stats.rank}</div>
            <div className="stat-label">Rank</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">⭐</div>
            <div className="stat-value">{sampleProfile.stats.level}</div>
            <div className="stat-label">Level</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">💻</div>
            <div className="stat-value">{sampleProfile.stats.programsSolved}</div>
            <div className="stat-label">Programs Solved</div>
          </div>
        </div>

        <div className="details-section">
          <div className="section-card">
            <h3 className="section-title">Problem Statistics</h3>
            <div className="problem-stats">
              <div className="problem-stat">
                <span className="problem-label">Code Tutor</span>
                <span className="problem-value">{sampleProfile.stats.codeTutor}</span>
                <span className="problem-points">0 pts each</span>
              </div>
              <div className="problem-stat">
                <span className="problem-label">Code Track</span>
                <span className="problem-value">{sampleProfile.stats.codeTrack}</span>
                <span className="problem-points">2 pts each</span>
              </div>
              <div className="problem-stat">
                <span className="problem-label">Code Test</span>
                <span className="problem-value">{sampleProfile.stats.codeTest}</span>
                <span className="problem-points">30 pts each</span>
              </div>
              <div className="problem-stat">
                <span className="problem-label">Daily Test</span>
                <span className="problem-value">{sampleProfile.stats.dailyTest}</span>
                <span className="problem-points">20 pts each</span>
              </div>
              <div className="problem-stat">
                <span className="problem-label">Daily Challenge</span>
                <span className="problem-value">{sampleProfile.stats.dailyChallenge}</span>
                <span className="problem-points">2 pts each</span>
              </div>
            </div>
          </div>

          <div className="section-card">
            <h3 className="section-title">Medals</h3>
            <div className="medals-grid">
              <div className="medal-item">
                <span className="medal-icon gold">🥇</span>
                <span className="medal-count">{sampleProfile.stats.gold}</span>
                <span className="medal-label">Gold</span>
              </div>
              <div className="medal-item">
                <span className="medal-icon silver">🥈</span>
                <span className="medal-count">{sampleProfile.stats.silver}</span>
                <span className="medal-label">Silver</span>
              </div>
              <div className="medal-item">
                <span className="medal-icon bronze">🥉</span>
                <span className="medal-count">{sampleProfile.stats.bronze}</span>
                <span className="medal-label">Bronze</span>
              </div>
            </div>
          </div>

          <div className="section-card">
            <h3 className="section-title">Programming Languages</h3>
            <div className="languages-list">
              {Object.entries(sampleProfile.languages).map(([lang, count]) => (
                <div key={lang} className="language-item">
                  <span className="language-name">{lang}</span>
                  <div className="language-bar-container">
                    <div
                      className="language-bar"
                      style={{ width: `${(count / Math.max(...Object.values(sampleProfile.languages))) * 100}%` }}
                    />
                  </div>
                  <span className="language-count">{count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="section-card">
            <h3 className="section-title">Certificates</h3>
            <div className="certificates-list">
              {sampleProfile.certificates.map((cert, index) => (
                <div key={index} className="certificate-item">
                  <div className="certificate-info">
                    <h4 className="certificate-title">{cert.title}</h4>
                    <p className="certificate-date">{cert.date}</p>
                  </div>
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="certificate-link"
                  >
                    View →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <footer className="temp-user-footer">
        <button onClick={handleReset} className="try-again-button">
          Try Another Profile
        </button>
      </footer>
    </div>
  );
}
