// Konfigurasi Supabase
const SUPABASE_URL = 'https://lemcqkzamfcxkgywerpz.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlbWNxa3phbWZjeGtneXdlcnB6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE3Nzk4NzksImV4cCI6MjA4NzM1NTg3OX0.xCRad2p0DnSNOyxngELvqWVZYOX4seCLx3cNHZQcZGM';

// Inisialisasi Client
// Kita gunakan nama variabel 'sb' (singkatan Supabase) agar tidak bentrok dengan library bawaan
const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);