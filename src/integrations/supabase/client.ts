
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ibmgntcvawyfbaklogiw.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlibWdudGN2YXd5ZmJha2xvZ2l3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg2Njk3NzIsImV4cCI6MjA2NDI0NTc3Mn0.ppR76AOOYd2GLoBHX_Nv8HCZehXGw9b-Fx9TIprzMds'

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
})
