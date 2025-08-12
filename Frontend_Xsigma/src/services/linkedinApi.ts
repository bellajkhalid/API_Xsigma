// LinkedIn API Integration for XSigma
// This service handles LinkedIn API integration for professional networking

const LINKEDIN_CONFIG = {
  clientId: '862bk5tuerhhoy',
  clientSecret: 'WPL_AP1.xmFd1ACga8lQ01ca.lA1yHw==',
  redirectUri: typeof window !== 'undefined' ? `${window.location.origin}/linkedin/callback` : 'http://localhost:5173/linkedin/callback',
  scope: 'openid profile email w_member_social',
  apiBaseUrl: 'https://api.linkedin.com/v2',
  enabled: true
};

export interface LinkedInProfile {
  id: string;
  firstName: {
    localized: Record<string, string>;
    preferredLocale: {
      country: string;
      language: string;
    };
  };
  lastName: {
    localized: Record<string, string>;
    preferredLocale: {
      country: string;
      language: string;
    };
  };
  profilePicture?: {
    displayImage: string;
  };
  headline?: string;
  location?: {
    name: string;
  };
  industry?: string;
  summary?: string;
}

export interface LinkedInPost {
  id: string;
  author: string;
  text: {
    text: string;
  };
  created: {
    time: number;
  };
  activity: string;
  ugcPost?: {
    shareMediaCategory: string;
    media?: Array<{
      media: string;
      thumbnails?: Array<{
        url: string;
      }>;
    }>;
  };
}

export interface LinkedInCompany {
  id: string;
  name: {
    localized: Record<string, string>;
  };
  description?: {
    localized: Record<string, string>;
  };
  logo?: {
    original: string;
  };
  website?: {
    localized: Record<string, string>;
  };
  industries: string[];
  specialties: string[];
  foundedOn?: {
    year: number;
  };
  locations: Array<{
    country: string;
    city: string;
  }>;
}

class LinkedInApiService {
  private accessToken: string | null = null;
  private clientId: string;
  private redirectUri: string;
  private scope: string;

  constructor() {
    this.clientId = LINKEDIN_CONFIG.clientId;
    this.redirectUri = LINKEDIN_CONFIG.redirectUri;
    this.scope = LINKEDIN_CONFIG.scope;
    
    // Check for stored access token
    this.accessToken = localStorage.getItem('linkedin_access_token');
  }

  // Authentication methods
  getAuthUrl(): string {
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: this.clientId,
      redirect_uri: this.redirectUri,
      scope: this.scope,
      state: this.generateState()
    });

    return `https://www.linkedin.com/oauth/v2/authorization?${params.toString()}`;
  }

  private generateState(): string {
    const state = Math.random().toString(36).substring(2, 15);
    localStorage.setItem('linkedin_oauth_state', state);
    return state;
  }

  async exchangeCodeForToken(code: string, state: string): Promise<string> {
    const storedState = localStorage.getItem('linkedin_oauth_state');
    if (state !== storedState) {
      throw new Error('Invalid OAuth state parameter');
    }

    const response = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        client_id: this.clientId,
        client_secret: LINKEDIN_CONFIG.clientSecret,
        redirect_uri: this.redirectUri,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to exchange code for token');
    }

    const data = await response.json();
    this.accessToken = data.access_token;
    
    // Store token securely
    localStorage.setItem('linkedin_access_token', this.accessToken);
    localStorage.removeItem('linkedin_oauth_state');

    return this.accessToken;
  }

  // API request helper
  private async apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    if (!this.accessToken) {
      throw new Error('No LinkedIn access token available');
    }

    const url = `${LINKEDIN_CONFIG.apiBaseUrl}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0',
        ...options.headers,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        // Token expired, clear it
        this.logout();
        throw new Error('LinkedIn access token expired');
      }
      throw new Error(`LinkedIn API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // Profile methods
  async getProfile(): Promise<LinkedInProfile> {
    return this.apiRequest<LinkedInProfile>('/people/~');
  }

  async getProfilePicture(): Promise<string | null> {
    try {
      const response = await this.apiRequest<{
        elements: Array<{
          identifiers: Array<{
            identifier: string;
          }>;
        }>;
      }>('/people/~/profilePicture(displayImage~:playableStreams)');

      if (response.elements && response.elements.length > 0) {
        const element = response.elements[0];
        if (element.identifiers && element.identifiers.length > 0) {
          return element.identifiers[0].identifier;
        }
      }
      return null;
    } catch (error) {
      console.error('Error fetching profile picture:', error);
      return null;
    }
  }

  // Posts and sharing
  async sharePost(content: {
    text: string;
    url?: string;
    title?: string;
    description?: string;
    imageUrl?: string;
  }): Promise<void> {
    const profile = await this.getProfile();
    const authorUrn = `urn:li:person:${profile.id}`;

    const shareData = {
      author: authorUrn,
      lifecycleState: 'PUBLISHED',
      specificContent: {
        'com.linkedin.ugc.ShareContent': {
          shareCommentary: {
            text: content.text
          },
          shareMediaCategory: content.url ? 'ARTICLE' : 'NONE',
          ...(content.url && {
            media: [{
              status: 'READY',
              description: {
                text: content.description || ''
              },
              media: content.url,
              title: {
                text: content.title || ''
              },
              ...(content.imageUrl && {
                thumbnails: [{
                  url: content.imageUrl
                }]
              })
            }]
          })
        }
      },
      visibility: {
        'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
      }
    };

    await this.apiRequest('/ugcPosts', {
      method: 'POST',
      body: JSON.stringify(shareData),
    });
  }

  // Company pages (if you have a LinkedIn Company Page)
  async getCompanyInfo(companyId: string): Promise<LinkedInCompany> {
    return this.apiRequest<LinkedInCompany>(`/companies/${companyId}`);
  }

  async shareCompanyPost(companyId: string, content: {
    text: string;
    url?: string;
    title?: string;
    description?: string;
  }): Promise<void> {
    const authorUrn = `urn:li:organization:${companyId}`;

    const shareData = {
      author: authorUrn,
      lifecycleState: 'PUBLISHED',
      specificContent: {
        'com.linkedin.ugc.ShareContent': {
          shareCommentary: {
            text: content.text
          },
          shareMediaCategory: content.url ? 'ARTICLE' : 'NONE',
          ...(content.url && {
            media: [{
              status: 'READY',
              description: {
                text: content.description || ''
              },
              media: content.url,
              title: {
                text: content.title || ''
              }
            }]
          })
        }
      },
      visibility: {
        'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
      }
    };

    await this.apiRequest('/ugcPosts', {
      method: 'POST',
      body: JSON.stringify(shareData),
    });
  }

  // Utility methods
  isAuthenticated(): boolean {
    return !!this.accessToken;
  }

  logout(): void {
    this.accessToken = null;
    localStorage.removeItem('linkedin_access_token');
    localStorage.removeItem('linkedin_oauth_state');
  }

  getConfig() {
    return {
      clientId: this.clientId,
      redirectUri: this.redirectUri,
      scope: this.scope,
      enabled: LINKEDIN_CONFIG.enabled,
      isAuthenticated: this.isAuthenticated(),
    };
  }

  // Professional networking utilities
  async getConnectionsCount(): Promise<number> {
    try {
      const response = await this.apiRequest<{ paging: { total: number } }>('/people/~/connections?count=0');
      return response.paging.total;
    } catch (error) {
      console.error('Error fetching connections count:', error);
      return 0;
    }
  }

  // Content sharing helpers
  shareXSigmaUpdate(update: {
    type: 'research' | 'product' | 'achievement' | 'insight';
    title: string;
    description: string;
    url?: string;
    hashtags?: string[];
  }): Promise<void> {
    const hashtagString = update.hashtags ? update.hashtags.map(tag => `#${tag}`).join(' ') : '';
    const text = `${update.description}\n\n${hashtagString}\n\n#QuantitativeFinance #FinTech #XSigma`;

    return this.sharePost({
      text,
      url: update.url,
      title: update.title,
      description: update.description,
    });
  }

  // Professional profile enhancement
  generateProfileSummary(data: {
    role: string;
    company: string;
    expertise: string[];
    achievements: string[];
    mission: string;
  }): string {
    return `${data.role} at ${data.company}

🔬 Expertise:
${data.expertise.map(item => `• ${item}`).join('\n')}

🏆 Key Achievements:
${data.achievements.map(item => `• ${item}`).join('\n')}

🎯 Mission: ${data.mission}

Let's connect and discuss the future of quantitative finance! 🚀`;
  }
}

// Export singleton instance
export const linkedinApi = new LinkedInApiService();

// Export utility functions
export const linkedinUtils = {
  // Format profile data for display
  formatProfile(profile: LinkedInProfile) {
    const firstName = Object.values(profile.firstName.localized)[0] || '';
    const lastName = Object.values(profile.lastName.localized)[0] || '';
    
    return {
      id: profile.id,
      name: `${firstName} ${lastName}`.trim(),
      firstName,
      lastName,
      headline: profile.headline || '',
      location: profile.location?.name || '',
      industry: profile.industry || '',
      summary: profile.summary || '',
      profilePicture: profile.profilePicture?.displayImage || null,
    };
  },

  // Generate professional hashtags
  generateHashtags(category: 'research' | 'product' | 'insight' | 'achievement'): string[] {
    const baseHashtags = ['QuantitativeFinance', 'FinTech', 'XSigma'];
    
    const categoryHashtags = {
      research: ['Research', 'QuantitativeResearch', 'FinanceResearch', 'DataScience'],
      product: ['ProductLaunch', 'Innovation', 'API', 'Technology'],
      insight: ['MarketInsights', 'FinanceInsights', 'DataAnalysis', 'TradingInsights'],
      achievement: ['Achievement', 'Milestone', 'Success', 'Growth']
    };

    return [...baseHashtags, ...categoryHashtags[category]];
  },

  // Create professional post templates
  createPostTemplate(type: 'announcement' | 'insight' | 'achievement' | 'question') {
    const templates = {
      announcement: "Excited to announce {content}! 🚀\n\n{details}\n\n{hashtags}",
      insight: "💡 Key insight from our latest research:\n\n{content}\n\n{details}\n\n{hashtags}",
      achievement: "🏆 Proud to share: {content}\n\n{details}\n\nThank you to everyone who made this possible!\n\n{hashtags}",
      question: "🤔 Question for the community:\n\n{content}\n\n{details}\n\nWhat are your thoughts?\n\n{hashtags}"
    };

    return templates[type];
  }
};

export default linkedinApi;
