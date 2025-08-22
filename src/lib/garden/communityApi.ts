// Community Garden API Client for BoostMe Wellness Garden

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001'

export interface PublicGarden {
  id: string
  owner_name: string
  garden_name: string
  theme: string
  level: number
  total_plants: number
  visitors_today: number
  likes: number
  description?: string
  preview_image?: string
  special_plants?: string[]
  achievements?: number
  is_featured?: boolean
  trend_reason?: string
  created_days_ago?: number
}

export interface CommunityProject {
  id: string
  name: string
  description: string
  goal: string
  progress: number
  target: number
  participants: number
  days_remaining: number
  rewards: {
    xp: number
    star_seeds: number
    exclusive_plant?: string
    special_badge?: string
  }
  status: 'active' | 'completed' | 'upcoming'
}

export interface CommunityStats {
  total_gardens: number
  active_gardeners: number
  plants_growing: number
  daily_visitors: number
  community_projects: number
  completed_projects: number
}

export interface PublicGardenDetail {
  garden_info: {
    id: string
    owner_name: string
    garden_name: string
    theme: string
    level: number
    description: string
    created_at: string
    last_updated: string
    is_public: boolean
    visitor_count: number
  }
  plants: Array<{
    id: string
    name: string
    type: string
    stage: number
    stage_name: string
    health: number
    special_effects?: string[]
    can_water: boolean
    position: { x: number; y: number }
  }>
  decorations: Array<{
    type: string
    position: { x: number; y: number }
  }>
  visitor_actions: {
    can_like: boolean
    can_water_plants: boolean
    can_leave_comment: boolean
    daily_water_limit: number
    waters_used_today: number
  }
}

export interface LeaderboardEntry {
  rank: number
  user_name: string
  garden_name: string
  points_this_week: number
  garden_level: number
  badge: string
  activities: string[]
}

class CommunityAPI {
  private async fetch(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}/api/v1/garden/community${endpoint}`
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({}))
      throw new Error(error.message || `HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    if (!data.success) {
      throw new Error(data.message || 'API request failed')
    }

    return data.data
  }

  // Get community overview and featured gardens
  async getCommunityOverview(): Promise<{
    public_gardens: {
      featured_garden: PublicGarden
      trending_gardens: PublicGarden[]
      newest_gardens: PublicGarden[]
    }
    community_stats: CommunityStats
    community_projects: CommunityProject[]
    user_info: {
      can_create_public_garden: boolean
      daily_community_visits: number
      max_daily_visits: number
      community_level: number
    }
  }> {
    return this.fetch('/')
  }

  // Visit a specific public garden
  async visitPublicGarden(gardenId: string): Promise<PublicGardenDetail> {
    return this.fetch(`/gardens/${gardenId}`)
  }

  // Like a public garden
  async likeGarden(gardenId: string): Promise<{
    garden_id: string
    liked: boolean
    total_likes: number
    message: string
    rewards: {
      visitor_xp: number
      owner_star_seeds: number
    }
  }> {
    return this.fetch(`/gardens/${gardenId}/like`, {
      method: 'POST',
    })
  }

  // Water a plant in a public garden
  async waterPublicPlant(gardenId: string, plantId: string): Promise<{
    plant_id: string
    garden_id: string
    watered: boolean
    message: string
    rewards: {
      visitor_xp: number
      visitor_star_seeds: number
      owner_notification: boolean
    }
    plant_status: {
      health_increased: number
      new_health: number
      next_water_time: string
    }
  }> {
    return this.fetch(`/gardens/${gardenId}/plants/${plantId}/water`, {
      method: 'POST',
    })
  }

  // Join a community project
  async joinCommunityProject(projectId: string, contributionType: 'plant' | 'water' | 'visit' | 'share'): Promise<{
    project_id: string
    joined: boolean
    contribution_type: string
    message: string
    project_progress: {
      old_progress: number
      new_progress: number
      contribution: number
      target: number
    }
    rewards: {
      immediate_xp: number
      immediate_star_seeds: number
      progress_towards_completion: boolean
    }
  }> {
    return this.fetch(`/projects/${projectId}/join`, {
      method: 'POST',
      body: JSON.stringify({ contribution_type: contributionType }),
    })
  }

  // Get community leaderboard
  async getCommunityLeaderboard(): Promise<{
    weekly_top_gardeners: LeaderboardEntry[]
    most_visited_gardens: Array<{
      garden_name: string
      owner: string
      visits: number
    }>
    community_heroes: Array<{
      name: string
      contribution: string
    }>
  }> {
    return this.fetch('/leaderboard')
  }
}

// Export singleton instance
export const communityAPI = new CommunityAPI()

// Utility functions
export const getThemeDisplayName = (theme: string): string => {
  const themeMap: { [key: string]: string } = {
    tropical: 'สวนเมืองร้อน',
    zen: 'สวนเซน',
    cottage: 'สวนคอทเทจ',
    modern: 'สวนโมเดิร์น',
    seasonal_spring: 'ฤดูใบไม้ผลิ',
    premium_gold: 'สวนทองคำ'
  }
  return themeMap[theme] || theme
}

export const formatCommunityNumber = (num: number): string => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
  return num.toString()
}

export const getProjectStatusColor = (status: string): string => {
  const colorMap: { [key: string]: string } = {
    active: 'bg-green-100 text-green-700 border-green-200',
    completed: 'bg-blue-100 text-blue-700 border-blue-200',
    upcoming: 'bg-yellow-100 text-yellow-700 border-yellow-200'
  }
  return colorMap[status] || 'bg-gray-100 text-gray-600 border-gray-200'
}

export const getProjectProgress = (progress: number, target: number): number => {
  return Math.min((progress / target) * 100, 100)
}

export const formatTimeRemaining = (days: number): string => {
  if (days === 0) return 'วันสุดท้าย!'
  if (days === 1) return 'เหลือ 1 วัน'
  return `เหลือ ${days} วัน`
}

export const getBadgeEmoji = (badge: string): string => {
  const badgeEmojiMap: { [key: string]: string } = {
    'นักสวนเทพ': '👑',
    'นักสวนเก่ง': '🌟',
    'นักสุขภาพ': '💪',
    'นักสวนมือใหม่': '🌱',
    'ผู้นำชุมชน': '🏆',
    'เพื่อนที่ดี': '🤝'
  }
  return badgeEmojiMap[badge] || '🏅'
}