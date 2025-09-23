import { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';
import * as cheerio from 'cheerio';

// Inline types and utilities to avoid module resolution issues
interface ProfileStats {
  codeTutor: number;
  codeTrack: number;
  codeTest: number;
  dailyTest: number;
  dailyChallenge: number;
  totalPoints: number;
}

// URL validation for SkillRack profile format
function validateSkillRackUrl(url: string): boolean {
  try {
    const urlObj = new URL(url);
    
    // Check if it's HTTP or HTTPS protocol
    if (urlObj.protocol !== 'http:' && urlObj.protocol !== 'https:') {
      return false;
    }
    
    // Check if it's a SkillRack domain with www subdomain
    if (urlObj.hostname !== 'www.skillrack.com') {
      return false;
    }
    
    // Check if it matches the profile URL pattern: /profile/[id]/[hash]
    const pathPattern = /^\/profile\/\d+\/[a-zA-Z0-9]+$/;
    return pathPattern.test(urlObj.pathname);
  } catch {
    return false;
  }
}

// Function to calculate total points based on SkillRack scoring
function calculateTotalPoints(stats: Omit<ProfileStats, 'totalPoints'>): number {
  const codeTrackPoints = stats.codeTrack * 2;      // 2 points per Code Track
  const dailyTestPoints = stats.dailyTest * 20;     // 20 points per Daily Test
  const dailyChallengePoints = stats.dailyChallenge * 2; // 2 points per Daily Challenge
  const codeTestPoints = stats.codeTest * 30;       // 30 points per Code Test
  // Code Tutor = 0 points (display only)
  
  return codeTrackPoints + dailyTestPoints + dailyChallengePoints + codeTestPoints;
}

// Function to parse profile statistics from HTML
function parseProfileStats(html: string): ProfileStats {
  const $ = cheerio.load(html);
  
  // Extract values by label matching from .statistic elements
  function extractValueByLabel(labelText: string): number {
    let value = 0;
    
    $('.statistic').each((_, element) => {
      const label = $(element).find('.label').text().trim();
      if (label === labelText) {
        const valueText = $(element).find('.value').text().replace(/[^\d]/g, '');
        value = parseInt(valueText) || 0;
        return false; // Break the loop
      }
    });
    
    return value;
  }
  
  // Extract statistics for each category
  const codeTest = extractValueByLabel('CODE TEST');
  const codeTrack = extractValueByLabel('CODE TRACK');
  const dailyChallenge = extractValueByLabel('DC');
  const dailyTest = extractValueByLabel('DT');
  const codeTutor = extractValueByLabel('CODE TUTOR');
  
  // Calculate points according to SkillRack scoring system
  const totalPoints = calculateTotalPoints({
    codeTutor,
    codeTrack,
    codeTest,
    dailyTest,
    dailyChallenge
  });
  
  return {
    codeTutor,
    codeTrack,
    codeTest,
    dailyTest,
    dailyChallenge,
    totalPoints
  };
}

// URL preprocessing function for the API
function preprocessApiUrl(rawUrl: string): string {
  // Remove leading and trailing whitespace
  let cleanedUrl = rawUrl.trim();
  
  // Remove internal whitespace (spaces within the URL)
  cleanedUrl = cleanedUrl.replace(/\s+/g, '');
  
  // Add protocol if missing
  if (cleanedUrl && !cleanedUrl.match(/^https?:\/\//)) {
    // Check if it starts with skillrack.com or www.skillrack.com
    if (cleanedUrl.match(/^(www\.)?skillrack\.com/)) {
      cleanedUrl = `https://${cleanedUrl}`;
    }
  }
  
  // Normalize www subdomain (add if missing, SkillRack requires www)
  if (cleanedUrl.includes('://skillrack.com') && !cleanedUrl.includes('://www.skillrack.com')) {
    cleanedUrl = cleanedUrl.replace('://skillrack.com', '://www.skillrack.com');
  }
  
  return cleanedUrl;
}

// Simple in-memory rate limiting (resets on function restart)
const requestCounts = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10;

interface ApiResponse {
  success: boolean;
  data?: ProfileStats;
  error?: string;
  code?: 'INVALID_URL' | 'NETWORK_ERROR' | 'PARSE_ERROR' | 'NOT_FOUND';
}



// Rate limiting function
function checkRateLimit(clientIp: string): boolean {
  const now = Date.now();
  const clientData = requestCounts.get(clientIp);
  
  if (!clientData || now > clientData.resetTime) {
    // Reset or initialize counter
    requestCounts.set(clientIp, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }
  
  if (clientData.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }
  
  clientData.count++;
  return true;
}

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  // Only allow POST requests
  if (req.method !== 'POST') {
    const response: ApiResponse = {
      success: false,
      error: 'Method not allowed',
      code: 'INVALID_URL'
    };
    res.status(405).json(response);
    return;
  }
  
  // Basic rate limiting
  const clientIp = req.headers['x-forwarded-for'] as string || req.connection?.remoteAddress || 'unknown';
  if (!checkRateLimit(clientIp)) {
    const response: ApiResponse = {
      success: false,
      error: 'Too many requests. Please wait a moment before trying again.',
      code: 'NETWORK_ERROR'
    };
    res.status(429).json(response);
    return;
  }
  
  try {
    const { url } = req.body;
    
    // Validate URL format
    if (!url || typeof url !== 'string') {
      const response: ApiResponse = {
        success: false,
        error: 'URL is required and must be a string',
        code: 'INVALID_URL'
      };
      res.status(400).json(response);
      return;
    }
    
    // Preprocess the URL to clean whitespace and normalize format
    const cleanedUrl = preprocessApiUrl(url);
    
    // Validate SkillRack URL format using the cleaned URL
    if (!validateSkillRackUrl(cleanedUrl)) {
      const response: ApiResponse = {
        success: false,
        error: 'Invalid SkillRack profile URL format. Expected: https://www.skillrack.com/profile/[id]/[hash]',
        code: 'INVALID_URL'
      };
      res.status(400).json(response);
      return;
    }
    
    // Fetch the profile page with proper User-Agent headers using the cleaned URL
    const axiosResponse = await axios.get(cleanedUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1'
      },
      timeout: 10000 // 10 second timeout
    });
    
    // Parse the HTML and extract statistics
    const profileStats = parseProfileStats(axiosResponse.data);
    
    const response: ApiResponse = {
      success: true,
      data: profileStats
    };
    
    res.status(200).json(response);
    
  } catch (error: any) {
    console.error('Error parsing profile:', error);
    
    let errorResponse: ApiResponse;
    
    if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
      errorResponse = {
        success: false,
        error: 'Unable to connect to SkillRack. Please check your internet connection.',
        code: 'NETWORK_ERROR'
      };
    } else if (error.response?.status === 404) {
      errorResponse = {
        success: false,
        error: 'Profile not found. Please check if the URL is correct and the profile is public.',
        code: 'NOT_FOUND'
      };
    } else if (error.response?.status === 403) {
      errorResponse = {
        success: false,
        error: 'Access denied. The profile might be private or require login.',
        code: 'NOT_FOUND'
      };
    } else if (error.code === 'ECONNABORTED') {
      errorResponse = {
        success: false,
        error: 'Request timeout. Please try again.',
        code: 'NETWORK_ERROR'
      };
    } else {
      errorResponse = {
        success: false,
        error: 'Failed to parse profile data. Please verify the profile URL is correct.',
        code: 'PARSE_ERROR'
      };
    }
    
    res.status(500).json(errorResponse);
  }
}

