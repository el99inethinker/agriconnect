import{createClient} from'@supabase/supabase-js'
const supabaseurl=process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey=process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
export const supabase=createClient(supabaseurl, supabaseKey)