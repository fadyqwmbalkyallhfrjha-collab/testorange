import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,   // ضع هنا متغير البيئة في Vercel
  process.env.SUPABASE_KEY    // ضع هنا الـ Anon Key من Supabase
);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, idNumber, loanAmount, address, job, orange } = req.body;

    const { data, error } = await supabase
      .from('loan_requests')   // اسم الجدول الذي أنشأته في Supabase
      .insert([{ name, idNumber, loanAmount, address, job, orange }]);

    if (error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(200).json({ message: "تم حفظ البيانات بنجاح", data });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
