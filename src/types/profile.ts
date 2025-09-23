/**
 * Interface representing SkillRack profile statistics
 * Based on requirements 6.1-6.6 for accurate point calculations
 */
export interface ProfileStats {
  /** Count of Code Tutor problems (0 points each) - Requirement 6.2 */
  codeTutor: number;
  
  /** Count of Code Track problems (2 points each) - Requirement 6.1 */
  codeTrack: number;
  
  /** Count of Code Tests (30 points each) - Requirement 6.5 */
  codeTest: number;
  
  /** Count of Daily Tests (20 points each, max 1/day) - Requirement 6.3 */
  dailyTest: number;
  
  /** Count of Daily Challenges (2 points each, max 1/day) - Requirement 6.4 */
  dailyChallenge: number;
  
  /** Calculated total points from all categories - Requirement 6.6 */
  totalPoints: number;
}