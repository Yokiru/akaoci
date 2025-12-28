/**
 * SUPABASE CONFIGURATION
 * Initializes the Supabase client
 * Requires Supabase JS CDN to be loaded before this script
 */

const SUPABASE_URL = 'https://jrrxgykoevtgnusszvst.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpycnhneWtvZXZ0Z251c3N6dnN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4ODE3ODgsImV4cCI6MjA4MjQ1Nzc4OH0.Jk8SOzs1m5mjzQ5LCwZgAnbOdLo6JfvV86qPidbUs5s';

// Initialize Supabase Client
// Ensure this script is loaded AFTER the Supabase CDN
let _supabase = null;

function getSupabase() {
    if (!_supabase) {
        if (typeof supabase !== 'undefined') {
            _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
        } else {
            console.error('Supabase client not found. Make sure the CDN script is included.');
        }
    }
    return _supabase;
}
