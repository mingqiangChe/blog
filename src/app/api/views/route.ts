import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  try {
    const { slugs } = await req.json();
    if (!slugs || !Array.isArray(slugs)) {
      return Response.json(
        { error: 'Missing or invalid slugs' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('views')
      .select('slug, count')
      .in('slug', slugs);

    if (error) throw error;

    const counts: Record<string, number> = {};
    for (const item of data ?? []) {
      counts[item.slug] = item.count ?? 0;
    }

    return Response.json({ counts });
  } catch (err) {
    console.error('View API error:', err);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
