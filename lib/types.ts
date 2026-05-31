export interface Course {
  id: string;
  title: string;
  progress: number;
  icon_name: string;
  created_at: string;
}

export interface ActivityDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4; // Represents progress levels for contribution-like graph
}

export interface Profile {
  id: string;
  full_name: string;
  streak_days: number;
  level_title: string;
  total_hours: number;
  target_percentage: number;
  rank_percentage: number;
  created_at: string;
}

