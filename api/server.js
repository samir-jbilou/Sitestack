import { createClient } from '@supabase/supabase-js';

// 1. Setup the Database Connection
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  // 2. Allow your frontend to talk to this backend (CORS)
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle the "Hello" handshake from the browser
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 3. Only run this code if it's a POST request (Sending data)
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // 4. Get the data from the website
  const { name, email, project_type, message } = req.body;

  try {
    // 5. Insert the data into the 'leads' table in Supabase
    const { data, error } = await supabase
      .from('leads')
      .insert([
        { name, email, project_type, message }
      ])
      .select();

    if (error) throw error;

    // 6. Success! Tell the website it worked
    return res.status(200).json({ success: true, message: 'Lead saved successfully!' });

  } catch (error) {
    // If something breaks, tell us why
    return res.status(500).json({ error: error.message });
  }
}