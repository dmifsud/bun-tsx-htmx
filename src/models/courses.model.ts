interface Label {
    category: string;
    name: string;
  }
  
  interface Tag {
    category: string;
    name: string;
  }

export interface Activity {
    author: string;
    badge_image: string;
    coming_soon: boolean;
    corner_state: string | null;
    course_bookmark: boolean;
    course_cover_class: string;
    course_policy_text_long: string | null;
    course_policy_text_short: string | null;
    course_url: string;
    difficulty: string;
    duration_total: number;
    header_colour: string | null;
    id: number;
    labels: Label[];
    latest_activity_at: string | null;
    lead_text: string | null;
    level: number;
    mark_total: number;
    name: string;
    not_publicly_accessible: boolean;
    not_publicly_listed: boolean;
    not_visible: boolean;
    points: number;
    recent_slide_url: string;
    type: number;
    description: string;
    band: string[] | null;
    retiring: boolean;
    tags: Tag[];
    sort_popular: number;
    sort_trending: number;
    sort_released: number;
}

export interface CourseActivitiesResponse {
  top_activity_id: string | null;
  activities: Activity[];
}