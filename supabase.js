// supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ovcinwogaozlxeqtutih.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92Y2lud29nYW96bHhlcXR1dGloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMyOTgzMTQsImV4cCI6MjAzODg3NDMxNH0.sg3sAC1dj6YMat58cMfocZO16vPNl69C0TYjNv3Rc1A'
const supabase = createClient(supabaseUrl, supabaseKey)
export default supabase;
