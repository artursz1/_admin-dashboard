import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://slggthbwaspmopioojts.supabase.co';
const serviceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNsZ2d0aGJ3YXNwbW9waW9vanRzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3NTQyNTE3MCwiZXhwIjoxOTkxMDAxMTcwfQ.9FV3qe6VIr46KFydmZsb8-yVoq_y-bzaPetrDUSHJ10';

export default createClient(supabaseUrl, serviceKey);