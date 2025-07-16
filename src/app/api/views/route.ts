import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  const body = await req.json();
  const slugs = body.slugs;

  if (!Array.isArray(slugs)) {
    return new Response(JSON.stringify({ error: 'Invalid slugs input' }), {
      status: 400,
    });
  }

  const { data, error } = await supabase
    .from('views')
    .select('slug, count')
    .in('slug', slugs);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }

  const result = Object.fromEntries(data.map((v) => [v.slug, v.count]));
  return new Response(JSON.stringify({ counts: result }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
