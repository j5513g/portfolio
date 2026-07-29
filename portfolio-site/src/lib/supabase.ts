import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = url && key ? createClient(url, key) : null

export type JournalImage = {
  url: string
  rotation: number
  zoom: number
  posX: number
  posY: number
}

export type JournalPost = {
  id: string
  title: string
  body: string
  image_url?: string | null
  images: JournalImage[]
  date: string
  date_end: string | null
  tags: string[]
  created_at: string
}

export type ExperienceRole = {
  id: string
  title: string
  organization: string
  start_date: string
  end_date: string | null
  description: string | null
  type: 'role' | 'leadership' | 'certification'
  sort_order: number
}
