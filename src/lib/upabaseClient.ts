import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fusrmsbzfmnicfsbyjzd.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ1c3Jtc2J6Zm1uaWNmc2J5anpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2NTgwNDgsImV4cCI6MjA2ODIzNDA0OH0.xtmEdoPwsT_O8WqNnpvg-eHNst33O-ncc3B4rJ8MqUA'; // ←替换成你的 anon 公钥

export const supabase = createClient(supabaseUrl, supabaseKey);
