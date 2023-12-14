import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jrtbthlzbocvajzmeldg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpydGJ0aGx6Ym9jdmFqem1lbGRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ2NzQ1NTksImV4cCI6MjAwMDI1MDU1OX0.fp3B6rKxawj23OYKGnzLSkraqr3HurYXyhDFvUFsggE';

export const supabase = createClient(supabaseUrl, supabaseKey);
 