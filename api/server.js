import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';

// 1. Setup Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// 2. Setup Email Transporter (Gmail)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export default async function handler(req, res) {
  // CORS Headers (Allow your website to talk to this server)
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  const { name, email, project_type, message } = req.body;

  try {
    // A. Save to Supabase (Database)
    const { error: dbError } = await supabase
      .from('leads')
      .insert([{ name, email, project_type, message }]);

    if (dbError) throw dbError;

    // B. Send Email Notification
    await transporter.sendMail({
      from: `"Sitestack Bot" <${process.env.EMAIL_USER}>`, // Sender
      to: 'sitestack.inc@gmail.com', // Receiver (You)
      subject: `🚀 New Lead: ${name}`,
      html: `
        <h2>New Project Inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Type:</strong> ${project_type}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `,
    });

    return res.status(200).json({ success: true, message: 'Saved and emailed!' });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}