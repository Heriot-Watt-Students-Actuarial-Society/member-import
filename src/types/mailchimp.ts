export interface Segment {
  id: number
  name: string
  member_count: number
  type: "saved" | "static" | "fuzzy"
  created_at: string
  updated_at: string
}
