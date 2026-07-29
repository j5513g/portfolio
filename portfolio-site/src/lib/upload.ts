import { supabase } from './supabase'

export async function uploadJournalImage(file: File) {
  if (!supabase) throw new Error('supabase not configured')
  const ext = file.name.split('.').pop() ?? 'jpg'
  const path = `${crypto.randomUUID()}.${ext}`
  const { error } = await supabase.storage.from('journal-images').upload(path, file)
  if (error) throw error
  return supabase.storage.from('journal-images').getPublicUrl(path).data.publicUrl
}
